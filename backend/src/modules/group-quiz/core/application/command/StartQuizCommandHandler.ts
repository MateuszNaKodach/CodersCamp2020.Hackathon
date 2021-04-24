import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { StartQuiz } from './StartQuiz';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { startQuiz } from '../../domain/GroupQuiz';
import { GroupQuizRepository } from '../GroupQuizRepository';

export class StartQuizCommandHandler implements CommandHandler<StartQuiz> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: GroupQuizRepository,
  ) {}

  async execute(command: StartQuiz): Promise<CommandResult> {
    const { state, events } = startQuiz(undefined, command, this.currentTimeProvider());
    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
