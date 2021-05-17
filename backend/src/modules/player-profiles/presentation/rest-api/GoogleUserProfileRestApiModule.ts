import { googleUserProfileRouter } from './GoogleUserProfileRouter';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { ModuleRestApi } from '../../../../shared/presentation/rest-api/ModuleRestApi';
import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';

export function GoogleUserProfileRestApiModule(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): ModuleRestApi {
  return {
    router: googleUserProfileRouter(commandPublisher, eventPublisher, queryPublisher),
    path: '/user-accounts',
  };
}
