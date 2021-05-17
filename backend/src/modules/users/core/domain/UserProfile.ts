export class UserProfile {
  readonly userId: string;
  readonly displayName: string;
  readonly email: string;
  readonly password: string;

  constructor(props: { userId: string; displayName: string; email: string; password: string }) {
    this.userId = props.userId;
    this.displayName = props.displayName;
    this.email = props.email;
    this.password = props.password;
  }
}

export function createUserProfile(command: { userId: string; displayName: string; email: string; password: string }): UserProfile {
  return new UserProfile({
    userId: command.userId,
    displayName: command.displayName,
    email: command.email,
    password: command.password,
  });
}