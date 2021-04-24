export class PostQuizSolutionRequestBody {
  readonly solution: { answerId: string; userId: string }[];

  constructor(solution: { answerId: string; userId: string }[]) {
    this.solution = solution;
  }
}
