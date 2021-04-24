import { ModuleCore } from '../../../shared/core/ModuleCore';
import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { QuestionsRepository } from './application/QuestionsRepository';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { DefineQuestion } from './application/command/DefineQuestion';

export function QuestionsModuleCore(
  eventPublisher: DomainEventPublisher,
  currentTimeProvider: CurrentTimeProvider,
  questionsRepository: QuestionsRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: DefineQuestion,
        handler: DefineQuestionCommandHandler(eventPublisher, currentTimeProvider(), questionsRepository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [],
  };
}