import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { GroupQuestionsRepository } from '../GroupQuestionsRepository';
import { Question } from '../../domain/Question';
import { GroupQuestions } from '../../domain/GroupQuestions';

export class QuestionWasDefinedEventHandler implements EventHandler<QuestionWasDefined> {
  constructor(private readonly groupQuestionsRepository: GroupQuestionsRepository) {
  }

  async handle(event: QuestionWasDefined): Promise<void> {
    const questionId = event.questionId;
    const groupId = event.groupId;
    const question = {
      questionId: questionId,
      text: event.text,
      authorId: event.authorId,
      groupId: groupId,
    };
    const groupQuestions = await this.groupQuestionsRepository.findByGroupId(groupId);

    if (!groupQuestions) {
      const questionList: Question[] = [question];
      const groupQuestions = new GroupQuestions({
        groupId: groupId,
        questionAskedLastly: undefined,
        questionAskedLastlyDate: undefined,
        questionList: questionList,
      });
      await this.groupQuestionsRepository.save(groupQuestions);
    } else {
      const existingQuestions = groupQuestions.questionList.filter((elem) =>
        elem.authorId !== event.authorId);

      existingQuestions.push(question);
      const newGroupQuestions = new GroupQuestions({ ...groupQuestions, questionList: existingQuestions },
      );
      await this.groupQuestionsRepository.save(newGroupQuestions);
    }
  }
}
