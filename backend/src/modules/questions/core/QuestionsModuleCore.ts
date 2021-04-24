import { ModuleCore } from '../../../shared/core/ModuleCore';
import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { UserQuestionsRepository } from './application/UserQuestionsRepository';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { DefineQuestion } from './application/command/DefineQuestion';
import { DefineQuestionCommandHandler } from './application/command/DefineQuestionCommandHandler';
import { GroupQuestionWasAsked } from '../../asking-question/core/domain/event/GroupQuestionWasAsked';
import { GroupQuestionAskedEventHandler } from './application/event/GroupQuestionAskedEventHandler';
import { GroupQuestionsRepository } from './application/GroupQuestionsRepository';
import { QuestionWasDefined } from './domain/event/QuestionWasDefined';
import { QuestionWasDefinedEventHandler } from './application/event/QuestionWasDefinedEventHandler';
import { TimeHasPassed } from '../../time/core/domain/event/TimeHasPassed';
import { TimeHasPassedEventHandler } from './application/event/TimeHasPassedEventHandler';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';

export function QuestionsModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  groupQuestionsRepository: GroupQuestionsRepository,
  questionsRepository: UserQuestionsRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: DefineQuestion,
        handler: new DefineQuestionCommandHandler(eventPublisher, currentTimeProvider, questionsRepository),
      },
    ],
    eventHandlers: [
      {
        eventType: GroupQuestionWasAsked,
        handler: new GroupQuestionAskedEventHandler(groupQuestionsRepository),
      },
      {
        eventType: QuestionWasDefined,
        handler: new QuestionWasDefinedEventHandler(groupQuestionsRepository),
      },
      {
        eventType: TimeHasPassed,
        handler: new TimeHasPassedEventHandler(groupQuestionsRepository, commandPublisher),
      },
    ],
    queryHandlers: [],
  };
}
