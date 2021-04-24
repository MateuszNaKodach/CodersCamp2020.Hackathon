export class UserQuestions {
  readonly questionId: string;

  constructor(props: { questionId: string }) {
    this.questionId = props.questionId;
  }
}
