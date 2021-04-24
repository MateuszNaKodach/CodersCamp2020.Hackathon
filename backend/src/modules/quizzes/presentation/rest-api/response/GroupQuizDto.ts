export type QuizAnswerDto = { answerId: string; text: string };
export type QuizUserDto = { userId: string };

export type GroupQuizDto = {
  quizId: string;
  groupId: string;
  answers: QuizAnswerDto[];
  startedAt: Date;
  users: QuizUserDto[];
};
