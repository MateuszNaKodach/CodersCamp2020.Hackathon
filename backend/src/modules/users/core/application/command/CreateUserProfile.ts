export class CreateUserProfile {
  readonly userId: string;
  readonly displayName: string;
  readonly email: string;
  readonly password: string;

  constructor(props: { userId: string, displayName: string, email: string, password: string }) {
    this.userId = props.userId;
    this.displayName = props.displayName;
    this.email = props.email;
    this.password = props.password;
  }
}