import {DomainEventPublisher} from "../../../shared/core/application/event/DomainEventBus";
import {CommandPublisher} from "../../../shared/core/application/command/CommandBus";
import {CurrentTimeProvider} from "../../../shared/core/CurrentTimeProvider";
import {PlayerProfilesRepository} from "../../player-profiles/core/application/PlayerProfilesRepository";
import {ModuleCore} from "../../../shared/core/ModuleCore";

export function PlayerProfilesModuleCore(
    eventPublisher: DomainEventPublisher,
    commandPublisher: CommandPublisher,
    currentTimeProvider: CurrentTimeProvider,
    playerProfileRepository: PlayerProfilesRepository,
): ModuleCore {
    return {
        commandHandlers: [],
        eventHandlers: [],
        queryHandlers: [],
    };
}