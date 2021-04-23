import {CommandPublisher} from '../../../../shared/core/application/command/CommandBus';
import {DomainEventPublisher} from '../../../../shared/core/application/event/DomainEventBus';
import {QueryPublisher} from '../../../../shared/core/application/query/QueryBus';
import {ModuleRestApi} from '../../../../shared/presentation/rest-api/ModuleRestApi';
import {groupQuestionAnswerRouter} from './GroupQuestionAnswerRouter';

export function GroupQuestionAnswerRestApiModule(
   commandPublisher: CommandPublisher,
   eventPublisher: DomainEventPublisher,
   queryPublisher: QueryPublisher,
): ModuleRestApi {
  return {
    router: groupQuestionAnswerRouter(commandPublisher, eventPublisher, queryPublisher),
    path: '/current-question/:groupId/answers\n',
  };
}
