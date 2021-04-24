import {GroupQuiz} from "../core/domain/GroupQuiz";
import {GroupQuizRepository} from "../core/application/GroupQuizRepository";

export class InMemoryGroupQuizRepository implements GroupQuizRepository {
  private readonly entities: { [quizId: string]: GroupQuiz } = {};

  findByGroupId(groupId: string): Promise<GroupQuiz[]> {
    const result = Object.values(this.entities).filter(quiz => quiz.groupId === groupId)
    return Promise.resolve(result);
  }

  save(quiz: GroupQuiz): Promise<void> {
    this.entities[quiz.quizId] = quiz;
    return Promise.resolve();
  }
}
