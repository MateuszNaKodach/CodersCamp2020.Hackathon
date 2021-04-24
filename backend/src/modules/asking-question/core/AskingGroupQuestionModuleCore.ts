import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { AskGroupQuestionCommandHandler } from './application/command/AskGroupQuestionCommandHandler';
import { AskGroupQuestion } from './application/command/AskGroupQuestion';
import { AskingGroupQuestionRepository } from './application/AskingGroupQuestionRepository';
import {FindCurrentGroupQuestionByGroupId} from "./application/query/FindCurrentGroupQuestionByGroupId";
import {FindCurrentGroupQuestionByGroupIdQueryHandler} from "./application/query/FindCurrentGroupQuestionByGroupIdQueryHandler";

export function PlayerProfilesModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  groupQuestionRepository: AskingGroupQuestionRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: AskGroupQuestion,
        handler: new AskGroupQuestionCommandHandler(eventPublisher, currentTimeProvider, groupQuestionRepository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [
      {
        queryType: FindCurrentGroupQuestionByGroupId,
        handler: new FindCurrentGroupQuestionByGroupIdQueryHandler(groupQuestionRepository),
      }
    ],
  };
}
