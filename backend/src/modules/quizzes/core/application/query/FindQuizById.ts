export class FindQuizById {
  readonly quizId: string;

  constructor(props: { quizId: string }) {
    this.quizId = props.quizId;
  }
}
