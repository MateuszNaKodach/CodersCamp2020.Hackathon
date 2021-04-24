import {ModuleCore} from '../../../shared/core/ModuleCore';
import {FindAllUserProfiles} from './application/query/FindAllUserProfiles';
import {FindAllUserProfilesQueryHandler} from './application/query/FindAllUserProfilesQueryHandler';
import {UserProfilesRepository} from './application/UserProfilesRepository';
import {DomainEventPublisher} from '../../../shared/core/application/event/DomainEventBus';
import {CurrentTimeProvider} from '../../../shared/core/CurrentTimeProvider';
import {FindUserProfileById} from './application/query/FindUserProfileById';
import {FindUserProfileByIdQueryHandler} from './application/query/FindUserProfileByIdQueryHandler';
import {CommandPublisher} from '../../../shared/core/application/command/CommandBus';
import {CreateUserProfileCommandHandler} from './application/command/CreateUserProfileCommandHandler';
import {CreateUserProfile} from './application/command/CreateUserProfile';

export function UserProfilesModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  userProfileRepository: UserProfilesRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: CreateUserProfile,
        handler: new CreateUserProfileCommandHandler(eventPublisher, userProfileRepository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [
      {
        queryType: FindUserProfileById,
        handler: new FindUserProfileByIdQueryHandler(userProfileRepository),
      },
      {
        queryType: FindAllUserProfiles,
        handler: new FindAllUserProfilesQueryHandler(userProfileRepository),
      },
    ],
  };
}
