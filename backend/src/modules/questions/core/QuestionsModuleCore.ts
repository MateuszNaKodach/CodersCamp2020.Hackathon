import { ModuleCore } from '../../../shared/core/ModuleCore';
import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { UserQuestionsRepository } from './application/UserQuestionsRepository';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { DefineQuestion } from './application/command/DefineQuestion';
import { DefineQuestionCommandHandler } from './application/command/DefineQuestionCommandHandler';
import { FindQuestionsByAuthorId } from './application/query/FindQuestionsByAuthorId';
import { FindQuestionsByAuthorIdQueryHandler } from './application/query/FindQuestionsByAuthorIdQueryHandler';

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
    queryHandlers: [
      {
        queryType: FindQuestionsByAuthorId,
        handler: new FindQuestionsByAuthorIdQueryHandler(questionsRepository),
      },
    ],
  };
}
