import { ModuleCore } from '../../../shared/core/ModuleCore';
import { FindAllPlayerProfiles } from './application/query/FindAllPlayerProfiles';
import { FindAllPlayerProfilesQueryHandler } from './application/query/FindAllPlayerProfilesQueryHandler';
import { PlayerProfilesRepository } from './application/PlayerProfilesRepository';
import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { FindPlayerProfileById } from './application/query/FindPlayerProfileById';
import { FindPlayerProfileByIdQueryHandler } from './application/query/FindPlayerProfileByIdQueryHandler';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';

export function PlayerProfilesModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  playerProfileRepository: PlayerProfilesRepository,
): ModuleCore {
  return {
    commandHandlers: [],
    eventHandlers: [],
    queryHandlers: [
      {
        queryType: FindPlayerProfileById,
        handler: new FindPlayerProfileByIdQueryHandler(playerProfileRepository),
      },
      {
        queryType: FindAllPlayerProfiles,
        handler: new FindAllPlayerProfilesQueryHandler(playerProfileRepository),
      },
    ],
  };
}
