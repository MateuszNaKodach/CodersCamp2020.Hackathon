import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { ModuleRestApi } from '../../../../shared/presentation/rest-api/ModuleRestApi';
import { groupQuestionAnswerRouter } from './GroupQuestionAnswerRouter';
import { AnswerGroupQuestionRepository } from '../../core/application/AnswerGroupQuestionRepository';
import { AskingGroupQuestionRepository } from '../../../asking-question/core/application/AskingGroupQuestionRepository';
import { EntityIdGenerator } from '../../../../shared/core/application/EntityIdGenerator';

export function GroupQuestionAnswerRestApiModule(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
  groupQuestionAnsweredRepository: AnswerGroupQuestionRepository,
  askingGroupQuestionRepository: AskingGroupQuestionRepository,
  entityIdGenerator: EntityIdGenerator,
): ModuleRestApi {
  return {
    router: groupQuestionAnswerRouter(
      commandPublisher,
      eventPublisher,
      queryPublisher,
      groupQuestionAnsweredRepository,
      askingGroupQuestionRepository,
      entityIdGenerator,
    ),
    path: '/current-question/:groupId',
  };
}
