export class UserProfile {
  readonly userId: string;
  readonly displayName: string;

  constructor(props: { userId: string; displayName: string }) {
    this.userId = props.userId;
    this.displayName = props.displayName;
  }
}

export function createUserProfile(command: { userId: string; displayName: string }): UserProfile {
  return new UserProfile({
    userId: command.userId,
    displayName: command.displayName,
  });
}
