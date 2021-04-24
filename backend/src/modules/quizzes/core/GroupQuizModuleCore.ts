import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { GroupQuizRepository } from './application/GroupQuizRepository';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { StartQuiz } from './application/command/StartQuiz';
import { StartQuizCommandHandler } from './application/command/StartQuizCommandHandler';
import { FindCurrentQuizByGroupId } from './application/query/FindCurrentQuizByGroupId';
import { FindCurrentQuizByGroupIdQueryHandler } from './application/query/FindCurrentQuizByGroupIdQueryHandler';

export function GroupQuizModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  groupQuizRepository: GroupQuizRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: StartQuiz,
        handler: new StartQuizCommandHandler(eventPublisher, currentTimeProvider, groupQuizRepository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [
      {
        queryType: FindCurrentQuizByGroupId,
        handler: new FindCurrentQuizByGroupIdQueryHandler(groupQuizRepository),
      },
    ],
  };
}
