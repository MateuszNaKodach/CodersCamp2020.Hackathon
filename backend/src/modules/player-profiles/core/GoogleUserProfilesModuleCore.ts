import { ModuleCore } from '../../../shared/core/ModuleCore';
import { FindAllGoogleUserProfiles } from './application/query/FindAllGoogleUserProfiles';
import { FindAllGoogleUserProfilesQueryHandler } from './application/query/FindAllGoogleUserProfilesQueryHandler';
import { GoogleUserProfilesRepository } from './application/GoogleUserProfilesRepository';
import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { FindGoogleUserProfileById } from './application/query/FindGoogleUserProfileById';
import { FindGoogleUserProfileByIdQueryHandler } from './application/query/FindGoogleUserProfileByIdQueryHandler';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CreateGoogleUserProfileCommandHandler } from './application/command/CreateGoogleUserProfileCommandHandler';
import { CreateGoogleUserProfile } from './application/command/CreateGoogleUserProfile';

export function GoogleUserProfilesModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  userProfileRepository: GoogleUserProfilesRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: CreateGoogleUserProfile,
        handler: new CreateGoogleUserProfileCommandHandler(eventPublisher, userProfileRepository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [
      {
        queryType: FindGoogleUserProfileById,
        handler: new FindGoogleUserProfileByIdQueryHandler(userProfileRepository),
      },
      {
        queryType: FindAllGoogleUserProfiles,
        handler: new FindAllGoogleUserProfilesQueryHandler(userProfileRepository),
      },
    ],
  };
}
