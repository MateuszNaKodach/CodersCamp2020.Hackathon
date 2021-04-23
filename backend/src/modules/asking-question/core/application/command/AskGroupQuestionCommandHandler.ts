import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { AskGroupQuestion } from './AskGroupQuestion';
import { AskingGroupQuestionRepository } from '../AskingGroupQuestionRepository';
import { askGroupQuestion } from '../../domain/GroupQuestion';

export class AskGroupQuestionCommandHandler implements CommandHandler<AskGroupQuestion> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: AskingGroupQuestionRepository,
  ) {}

  async execute(command: AskGroupQuestion): Promise<CommandResult> {
    const { state, events } = askGroupQuestion(command, this.currentTimeProvider);

    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
