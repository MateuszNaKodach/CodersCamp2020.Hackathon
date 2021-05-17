import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { ModuleRestApi } from '../../../../shared/presentation/rest-api/ModuleRestApi';
import { userProfileRouter } from './UserProfileRouter';

export function UserProfileRestApiModule(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher
): ModuleRestApi {
  return {
    router: userProfileRouter(commandPublisher, eventPublisher, queryPublisher),
    path: '/users'
  }
}