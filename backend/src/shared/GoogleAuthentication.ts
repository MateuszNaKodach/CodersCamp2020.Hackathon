import { OAuth2Client, TokenPayload } from 'google-auth-library';

export type GoogleAuthUser = {
  readonly userId: string;
  readonly email: string | undefined;
  readonly givenName: string | undefined;
  readonly familyName: string | undefined;
  readonly photoUrl: string | undefined;
};

export async function googleAuth(token: string | undefined): Promise<GoogleAuthUser | undefined> {
  if (process.env.GOOGLE_CLIENT_ID === undefined) {
    return Promise.resolve(undefined);
  }
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  if (token === undefined) {
    throw new Error("Token doesn't exists!.");
  }
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload: TokenPayload | undefined = ticket.getPayload();

  if (payload === undefined) {
    throw new Error("Such account doesn't exists!.");
  }

  const { sub, email, given_name, family_name, picture } = payload;
  const userId = sub;
  return { userId, email, givenName: given_name, familyName: family_name, photoUrl: picture };
}
