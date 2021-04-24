export class ResolveQuiz {
  readonly quizId: string;
  readonly groupId: string;
  readonly questionId: string;
  readonly solutionAuthorId: string;
  readonly solution: { answerId: string; userId: string }[];

  static command(props: {
    readonly quizId: string;
    readonly groupId: string;
    readonly questionId: string;
    readonly solutionAuthorId: string;
    readonly solution: { answerId: string; userId: string }[];
  }): ResolveQuiz {
    return new ResolveQuiz(props.quizId, props.groupId, props.questionId, props.solutionAuthorId, props.solution);
  }

  constructor(
    quizId: string,
    groupId: string,
    questionId: string,
    solutionAuthorId: string,
    solution: { answerId: string; userId: string }[],
  ) {
    this.quizId = quizId;
    this.groupId = groupId;
    this.questionId = questionId;
    this.solutionAuthorId = solutionAuthorId;
    this.solution = solution;
  }
}
