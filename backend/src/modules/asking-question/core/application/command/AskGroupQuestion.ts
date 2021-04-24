export class AskGroupQuestion {
  readonly questionId: string;
  readonly groupId: string;
  readonly authorId: string;
  readonly text: string;

  constructor(props: { questionId: string; groupId: string; authorId: string; text: string }) {
    this.questionId = props.questionId;
    this.groupId = props.groupId;
    this.authorId = props.authorId;
    this.text = props.text;
  }
}
