import { QuestionAnswer } from './domain/QuestionAnswer';

export interface AnswerGroupQuestionRepository {
  save(answeredGroupQuestion: QuestionAnswer): Promise<void>;

  findAllByGroupId(groupId: string): Promise<QuestionAnswer[] | undefined>;

  findAllByQuestionId(questionId: string): Promise<QuestionAnswer[]>;

  findAll(): Promise<QuestionAnswer[]>;
}
