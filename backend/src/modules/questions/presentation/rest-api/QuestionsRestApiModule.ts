import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { ModuleRestApi } from '../../../../shared/presentation/rest-api/ModuleRestApi';
import { questionsRouter } from './QuestionsRouter';
import { GroupQuestionsRepository } from '../../core/application/GroupQuestionsRepository';

export function QuestionsRestApiModule(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
  groupQuestionsRepository: GroupQuestionsRepository,
): ModuleRestApi {
  return {
    router: questionsRouter(commandPublisher, eventPublisher, queryPublisher, groupQuestionsRepository),
    path: '/questions',
  };
}
