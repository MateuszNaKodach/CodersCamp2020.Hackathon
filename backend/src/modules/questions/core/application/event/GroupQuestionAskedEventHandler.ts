import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { GroupQuestionsRepository } from '../GroupQuestionsRepository';
import { GroupQuestions } from '../../domain/GroupQuestions';
import { GroupQuestionWasAsked } from '../../../../asking-question/core/domain/event/GroupQuestionWasAsked';

export class GroupQuestionAskedEventHandler implements EventHandler<GroupQuestionWasAsked> {
  constructor(private readonly groupQuestionsRepository: GroupQuestionsRepository) {}

  async handle(event: GroupQuestionWasAsked): Promise<void> {
    const questionId = event.questionId;
    const groupId = event.groupId;

    const groupQuestions = await this.groupQuestionsRepository.findByGroupId(groupId);

    const existingQuestions = groupQuestions!.questionList.filter((elem) => elem.questionId !== questionId);

    const newGroupQuestions = new GroupQuestions({
      questionList: existingQuestions,
      questionAskedLastlyDate: new Date(),
      groupId: groupQuestions!.groupId,
      questionAskedLastly: {
        questionId: questionId,
        text: event.text,
        authorId: event.askedBy,
        groupId: groupId,
      },
    });
    await this.groupQuestionsRepository.save(newGroupQuestions);
  }
}
