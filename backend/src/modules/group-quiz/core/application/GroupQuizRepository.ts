import {GroupQuiz} from "../domain/GroupQuiz";

export interface GroupQuizRepository {

  findByGroupId(groupId: string): Promise<GroupQuiz | undefined>

  save(quiz: GroupQuiz): Promise<void>
}

