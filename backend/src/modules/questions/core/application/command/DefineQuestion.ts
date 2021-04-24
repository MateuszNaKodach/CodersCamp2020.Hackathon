export class DefineQuestion {
  readonly questionId: string;
  readonly groupId: string;
  readonly text: string;
  readonly authorId: string;

  constructor(props: { questionId: string; groupId: string; text: string; authorId: string }) {
    this.questionId = props.questionId;
    this.groupId = props.groupId;
    this.text = props.text;
    this.authorId = props.authorId;
  }
}
