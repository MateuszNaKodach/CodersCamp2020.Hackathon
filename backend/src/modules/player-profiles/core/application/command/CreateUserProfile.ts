export class CreateUserProfile {
  readonly userId: string;
  readonly displayName: string;

  constructor(props: { userId: string; displayName: string }) {
    this.userId = props.userId;
    this.displayName = props.displayName;
  }
}
