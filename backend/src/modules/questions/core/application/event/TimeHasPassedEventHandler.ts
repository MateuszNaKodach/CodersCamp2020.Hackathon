import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { TimeHasPassed } from '../../../../time/core/domain/event/TimeHasPassed';
import { GroupQuestionsRepository } from '../GroupQuestionsRepository';
import { GroupQuestions } from '../../domain/GroupQuestions';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { AskGroupQuestion } from '../../../../asking-question/core/application/command/AskGroupQuestion';
export class TimeHasPassedEventHandler implements EventHandler<TimeHasPassed> {
  constructor(private readonly groupQuestionsRepository: GroupQuestionsRepository, private readonly commandPublisher: CommandPublisher) {}

  async handle(event: TimeHasPassed): Promise<void> {
    const groupQuestions = await this.groupQuestionsRepository.findAll();
    if (groupQuestions.length === 0) {
      return;
    }
    const actualDate = event.occurredAt;
    const actualDay = actualDate.getDay();
    if (actualDay === 0 || actualDay === 6) {
      return;
    }
    if (actualDay !== groupQuestions[0].questionAskedLastlyDate!.getDay()) {
      await Promise.all(groupQuestions.map((groupsQuestions) => getQuestionsToAsk(groupsQuestions, this.commandPublisher)));
    }
  }
}

export async function getQuestionsToAsk(groupsQuestions: GroupQuestions, commandPublisher: CommandPublisher): Promise<void> {
  const randomQuestion = groupsQuestions.questionList[Math.floor(Math.random() * groupsQuestions.questionList.length)];
  await commandPublisher.execute(
    new AskGroupQuestion({
      questionId: randomQuestion.questionId,
      groupId: randomQuestion.groupId,
      authorId: randomQuestion.authorId,
      text: randomQuestion.text,
    }),
  );
}
