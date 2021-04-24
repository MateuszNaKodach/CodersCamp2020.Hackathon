import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { ScoresRepository } from '../ScoresRepository';
import { SumUserScores } from './SumUserScores';
import { sumUserScores } from '../../domain/UserScore';

export class SumUserScoresCommandHandler implements CommandHandler<SumUserScores> {
  constructor(private readonly eventPublisher: DomainEventPublisher, private readonly repository: ScoresRepository) {}

  async execute(command: SumUserScores): Promise<CommandResult> {
    const userScore = await this.repository.findByUserId(command.userId);

    const { state, events } = sumUserScores(userScore, command);

    await this.repository.save(state);
    return CommandResult.success();
  }
}
