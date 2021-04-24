import { GroupQuiz } from '../core/domain/GroupQuiz';
import { GroupQuizRepository } from '../core/application/GroupQuizRepository';

export class InMemoryGroupQuizRepository implements GroupQuizRepository {
  private readonly entities: { [quizId: string]: GroupQuiz } = {};

  findByGroupId(groupId: string): Promise<GroupQuiz[]> {
    const result = Object.values(this.entities).filter((quiz) => quiz.groupId === groupId);
    return Promise.resolve(result);
  }

  findByQuizId(quizId: string): Promise<GroupQuiz | undefined> {
    const result = Object.values(this.entities).find((quiz) => quiz.quizId === quizId);
    return Promise.resolve(result);
  }

  save(quiz: GroupQuiz): Promise<void> {
    this.entities[quiz.quizId] = quiz;
    return Promise.resolve();
  }
}
