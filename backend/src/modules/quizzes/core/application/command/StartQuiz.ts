export class StartQuiz {
  readonly quizId: string;
  readonly groupId: string;
  readonly question: { questionId: string; text: string };
  readonly answers: { answerId: string; userId: string; text: string }[];

  static command(props: {
    quizId: string;
    groupId: string;
    question: { questionId: string; text: string };
    answers: { answerId: string; userId: string; text: string }[];
  }): StartQuiz {
    return new StartQuiz(props.quizId, props.groupId, props.question, props.answers);
  }

  constructor(
    quizId: string,
    groupId: string,
    question: { questionId: string; text: string },
    answers: { answerId: string; userId: string; text: string }[],
  ) {
    this.quizId = quizId;
    this.groupId = groupId;
    this.question = question;
    this.answers = answers;
  }
}
