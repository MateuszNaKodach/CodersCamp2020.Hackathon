import {CommandHandler} from "../../../../../shared/core/application/command/CommandHandler";
import {OpenTournamentRegistrations} from "../../../../tournaments-registrations/core/application/command/OpenTournamentRegistrations";
import {DomainEventPublisher} from "../../../../../shared/core/application/event/DomainEventBus";
import {CurrentTimeProvider} from "../../../../../shared/core/CurrentTimeProvider";
import {TournamentRegistrationsRepository} from "../../../../tournaments-registrations/core/application/TournamentRegistrationsRepository";
import {CommandResult} from "../../../../../shared/core/application/command/CommandResult";
import {TournamentId} from "../../../../tournaments-registrations/core/domain/TournamentId";
import {openTournamentRegistrations} from "../../../../tournaments-registrations/core/domain/TournamentRegistrations";
import {AskGroupQuestion} from "./AskGroupQuestion";

export class AskGroupQuestionCommandHandler implements CommandHandler<AskGroupQuestion> {
    constructor(
        private readonly eventPublisher: DomainEventPublisher,
        private readonly currentTimeProvider: CurrentTimeProvider,
        private readonly repository: TournamentRegistrationsRepository,
    ) {
    }

    async execute(command: AskGroupQuestion): Promise<CommandResult> {
        const tournamentId = TournamentId.from(command.tournamentId);
        const tournamentRegistrations = await this.repository.findByTournamentId(tournamentId);

        const {
            state,
            events
        } = openTournamentRegistrations(tournamentRegistrations, {tournamentId}, this.currentTimeProvider);

        await this.repository.save(state);
        this.eventPublisher.publishAll(events);
        return CommandResult.success();
    }
}