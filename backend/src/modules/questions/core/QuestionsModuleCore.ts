import { ModuleCore } from '../../../shared/core/ModuleCore';
import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { UserQuestionsRepository } from './application/UserQuestionsRepository';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { DefineQuestion } from './application/command/DefineQuestion';
import { DefineQuestionCommandHandler } from './application/command/DefineQuestionCommandHandler';

export function QuestionsModuleCore(
  eventPublisher: DomainEventPublisher,
  currentTimeProvider: CurrentTimeProvider,
  questionsRepository: UserQuestionsRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: DefineQuestion,
        handler: new DefineQuestionCommandHandler(eventPublisher, currentTimeProvider, questionsRepository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [],
  };
}
