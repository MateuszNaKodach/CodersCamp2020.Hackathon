import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { UserProfileRepository } from './application/UserProfileRepository';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { CreateUserProfile } from './application/command/CreateUserProfile';
import { CreateUserProfileCommandHandler } from './application/command/CreateUserProfileCommandHandler';
import { FindUserProfileByEmail } from './application/query/FindUserProfileByEmail';
import { FindUserProfileByEmailQueryHandler } from './application/query/FindUserProfileByEmailQueryHandler';

export function UserProfileModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  userProfileRepository: UserProfileRepository
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: CreateUserProfile,
        handler: new CreateUserProfileCommandHandler(eventPublisher, userProfileRepository)
      }
    ],
    eventHandlers: [],
    queryHandlers: [
      {
        queryType: FindUserProfileByEmail,
        handler: new FindUserProfileByEmailQueryHandler(userProfileRepository)
      }
    ],
  }
}