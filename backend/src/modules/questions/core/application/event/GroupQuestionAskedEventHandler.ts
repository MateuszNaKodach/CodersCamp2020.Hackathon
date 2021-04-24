import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { GroupQuestionsRepository } from '../GroupQuestionsRepository';
import { GroupQuestions } from '../../domain/GroupQuestions';
import { GroupQuestionWasAsked } from '../../../../asking-question/core/domain/event/GroupQuestionWasAsked';
import { UserQuestionsRepository } from '../UserQuestionsRepository';
import { UserQuestions } from '../../domain/UserQuestions';

export class GroupQuestionAskedEventHandler implements EventHandler<GroupQuestionWasAsked> {
  constructor(
    private readonly groupQuestionsRepository: GroupQuestionsRepository,
    private readonly questionsRepository: UserQuestionsRepository,
  ) {}

  async handle(event: GroupQuestionWasAsked): Promise<void> {
    const questionId = event.questionId;
    const groupId = event.groupId;
    const authorId = event.askedBy;

    const groupQuestions = await this.groupQuestionsRepository.findByGroupId(groupId);
    const userQuestions = await this.questionsRepository.findByAuthorId(authorId);

    const existingQuestions = groupQuestions!.questionList.filter((elem) => elem.questionId !== questionId);
    const userExistingQuestions = userQuestions!.questions.filter((elem) => elem.questionId !== questionId);

    const newGroupQuestions = new GroupQuestions({
      questionList: existingQuestions,
      questionAskedLastlyDate: new Date(),
      groupId: groupQuestions!.groupId,
      questionAskedLastly: {
        questionId: questionId,
        text: event.text,
        authorId: authorId,
        groupId: groupId,
      },
    });

    const newUserQuestions = new UserQuestions({
      authorId: authorId,
      questions: userExistingQuestions,
    });

    await this.groupQuestionsRepository.save(newGroupQuestions);
    await this.questionsRepository.save(newUserQuestions);
  }
}
