import { ModuleCore } from '../../../shared/core/ModuleCore';
import { AnswerGroupQuestionCommandHandler } from './application/command/AnswerGroupQuestionCommandHandler';
import { AnswerGroupQuestion } from './application/command/AnswerGroupQuestion';
import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import {AnswerGroupQuestionRepository} from "./application/AnswerGroupQuestionRepository";

export function AnswerGroupQuestionModuleCore(eventPublisher: DomainEventPublisher, currentTimeProvider: CurrentTimeProvider, repository: AnswerGroupQuestionRepository): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: AnswerGroupQuestion,
        handler: new AnswerGroupQuestionCommandHandler(eventPublisher, currentTimeProvider, repository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [],
  };
}
