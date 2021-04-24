import { ResolveQuiz } from '../application/command/ResolveQuiz';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';

export class QuizSolution {
  readonly quizId: string;
  readonly groupId: string;
  readonly questionId: string;
  readonly solutionAuthorId: string;
  readonly solution: { answerId: string; userId: string }[];

  static fromProps(props: {
    readonly quizId: string;
    readonly groupId: string;
    readonly questionId: string;
    readonly solutionAuthorId: string;
    readonly solution: { answerId: string; userId: string }[];
  }): QuizSolution {
    return new QuizSolution(props.quizId, props.groupId, props.questionId, props.solutionAuthorId, props.solution);
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

export function resolveQuiz(
  quizSolution: QuizSolution | undefined,
  command: ResolveQuiz,
  currentTime: Date,
): DomainCommandResult<ResolveQuiz> {
  if (quizSolution !== undefined) {
    throw new Error('Quiz solution already sent!');
  }
  const solution = QuizSolution.fromProps(command);
  return {
    state: solution,
    events: [],
  };
}
