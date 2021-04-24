export class PostQuizSolutionRequestBody {
  readonly solutionAuthorId: string | undefined;
  readonly solution: { answerId: string; userId: string }[];

  constructor(solutionAuthorId: string | undefined, solution: { answerId: string; userId: string }[]) {
    this.solutionAuthorId = solutionAuthorId;
    this.solution = solution;
  }
}
