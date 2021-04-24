export class ResolveQuiz {
  readonly quizId: string;
  readonly solutionAuthorId: string;
  readonly solution: { answerId: string; userId: string }[];

  static command(props: {
    readonly quizId: string;
    readonly solutionAuthorId: string;
    readonly solution: { answerId: string; userId: string }[];
  }): ResolveQuiz {
    return new ResolveQuiz(props.quizId, props.solutionAuthorId, props.solution);
  }

  constructor(quizId: string, solutionAuthorId: string, solution: { answerId: string; userId: string }[]) {
    this.quizId = quizId;
    this.solutionAuthorId = solutionAuthorId;
    this.solution = solution;
  }
}
