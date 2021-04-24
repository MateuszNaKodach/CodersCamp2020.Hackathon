export class FindCurrentQuizByGroupId {
  readonly groupId: string;

  constructor(props: { groupId: string }) {
    this.groupId = props.groupId;
  }
}
