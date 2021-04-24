import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { ModuleRestApi } from '../../../../shared/presentation/rest-api/ModuleRestApi';
import { groupQuestionAnswerRouter } from './GroupQuestionAnswerRouter';
import { AnswerGroupQuestionRepository } from '../../core/application/AnswerGroupQuestionRepository';
import { EntityIdGenerator } from '../../../../shared/core/application/EntityIdGenerator';
import { GroupQuestionsRepository } from '../../../questions/core/application/GroupQuestionsRepository';

export function GroupQuestionAnswerRestApiModule(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
  groupQuestionAnsweredRepository: AnswerGroupQuestionRepository,
  groupQuestionsRepository: GroupQuestionsRepository,
  entityIdGenerator: EntityIdGenerator,
): ModuleRestApi {
  return {
    router: groupQuestionAnswerRouter(
      commandPublisher,
      eventPublisher,
      queryPublisher,
      groupQuestionAnsweredRepository,
      groupQuestionsRepository,
      entityIdGenerator,
    ),
    path: '/current-question',
  };
}
