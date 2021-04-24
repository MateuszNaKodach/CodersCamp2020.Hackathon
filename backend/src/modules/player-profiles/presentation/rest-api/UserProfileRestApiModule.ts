import { userProfileRouter } from './UserProfileRouter';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { ModuleRestApi } from '../../../../shared/presentation/rest-api/ModuleRestApi';
import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';

export function UserProfileRestApiModule(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): ModuleRestApi {
  return {
    router: userProfileRouter(commandPublisher, eventPublisher, queryPublisher),
    path: '/user-accounts',
  };
}
