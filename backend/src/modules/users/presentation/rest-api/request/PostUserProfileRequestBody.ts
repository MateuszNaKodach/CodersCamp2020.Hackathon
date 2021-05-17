export class PostUserProfileRequestBody {
  readonly userId: string;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly emailConfirmation: string;
  readonly password: string;
  readonly passwordConfirmation: string;
}
