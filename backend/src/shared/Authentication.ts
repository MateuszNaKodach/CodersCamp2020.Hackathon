import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
// import { OAuth2Client, TokenPayload } from 'google-auth-library';
//
// export type GoogleAuthUser = {
//   readonly userId: string;
//   readonly email: string | undefined;
//   readonly givenName: string | undefined;
//   readonly familyName: string | undefined;
//   readonly photoUrl: string | undefined;
// };
//
// export type AuthUser = {
//   readonly userId: string;
//   readonly email: string | undefined;
//   readonly displayName: string;
// }

interface RequestWithUserId extends Request{
  userId: string;
}

export function authentication(req: RequestWithUserId, res: Response, next: NextFunction): void {
    if(!req.headers.authorization) {
      throw new Error("Token doesn't exists!.");
    }
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    //TODO how to remove type any?
    let decodedData: any;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
}

// export async function authenticatedUser(req: Request): Promise<GoogleAuthUser | AuthUser | undefined> {
//   const token = req.headers.authorization;
//   if (!token) {
//     throw new Error("Token doesn't exists!.");
//   }
//
//   if (token.split(" ")[1].length < 500) {
//     return auth(token.split(" ")[1])
//   } else {
//     return googleAuth(token);
//   }
// }
//
// export async function auth(token: string): Promise<AuthUser | undefined> {
//   const user = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
//   return {userId: user.id}
// }
//
// export async function googleAuth(token: string): Promise<GoogleAuthUser | undefined> {
//   if (process.env.GOOGLE_CLIENT_ID === undefined) {
//     return Promise.resolve(undefined);
//   }
//   const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//   if (token === undefined) {
//     //throw new Error("Token doesn't exists!.");
//     return Promise.resolve(undefined);
//   }
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: process.env.GOOGLE_CLIENT_ID,
//   });
//   const payload: TokenPayload | undefined = ticket.getPayload();
//
//   if (payload === undefined) {
//     //throw new Error("Such account doesn't exists!.");
//     return Promise.resolve(undefined);
//   }
//
//   const { sub, email, given_name, family_name, picture } = payload;
//   const userId = sub;
//   return { userId, email, givenName: given_name, familyName: family_name, photoUrl: picture };
// }