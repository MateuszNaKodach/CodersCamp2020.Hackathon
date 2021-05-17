export class GoogleUserProfile {
  readonly userId: string;
  readonly displayName: string;

  constructor(props: { userId: string; displayName: string }) {
    this.userId = props.userId;
    this.displayName = props.displayName;
  }
}

export function createUserProfile(command: { userId: string; displayName: string }): GoogleUserProfile {
  return new GoogleUserProfile({
    userId: command.userId,
    displayName: command.displayName,
  });
}
