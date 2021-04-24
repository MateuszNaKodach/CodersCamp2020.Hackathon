import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { GroupQuestionsRepository } from '../GroupQuestionsRepository';
import { Question } from '../../domain/Question';
import { GroupQuestions } from '../../domain/GroupQuestions';

export class GroupQuestionAskedEventHandler implements EventHandler<GroupQuestionAsked> {
  constructor(private readonly groupQuestionsRepository: GroupQuestionsRepository) {}

  async handle(event: GroupQuestionAsked): Promise<void> {
    const questionId = event.questionId;
    const groupId = event.groupId;

    const groupQuestions = await this.groupQuestionsRepository.findByGroupId(groupId);

    const existingQuestions = groupQuestions.questionList.filter((elem) => elem.questionId !== questionId);

    const newGroupQuestions = new GroupQuestions({ ...groupQuestions, questionList: existingQuestions });
    await this.groupQuestionsRepository.save(newGroupQuestions);
  }
}
