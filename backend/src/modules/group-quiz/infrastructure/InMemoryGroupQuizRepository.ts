import {GroupQuiz} from "../core/domain/GroupQuiz";
import {GroupQuizRepository} from "../core/application/GroupQuizRepository";

export class InMemoryGroupQuizRepository implements GroupQuizRepository {
  private readonly entities: { [groupId: string]: GroupQuiz } = {};

  findByGroupId(groupId: string): Promise<GroupQuiz | undefined> {
    return Promise.resolve(this.entities[groupId]);
  }

  save(quiz: GroupQuiz): Promise<void> {
    this.entities[quiz.groupId] = quiz;
    return Promise.resolve(undefined);
  }
}
