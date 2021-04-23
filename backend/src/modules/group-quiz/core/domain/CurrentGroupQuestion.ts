export class CurrentGroupQuiz {
  readonly startedAt: Date;
  readonly quizId: string;
  readonly groupId: string;
  readonly question: { questionId: string; text: string };
  readonly answers: { answerId: string; text: string }[];
  readonly users: { userId: string }[];

  constructor(startedAt: Date, quizId: string, groupId: string, question: { questionId: string; text: string }, answers: { answerId: string; text: string }[], users: { userId: string }[]) {
    this.startedAt = startedAt;
    this.quizId = quizId;
    this.groupId = groupId;
    this.question = question;
    this.answers = answers;
    this.users = users;
  }
}



