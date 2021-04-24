import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { UserQuestionsRepository } from '../UserQuestionsRepository';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { DefineQuestion } from './DefineQuestion';
import { defineNewQuestion } from '../../domain/UserQuestions';

export class DefineQuestionCommandHandler implements CommandHandler<DefineQuestion> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: UserQuestionsRepository,
  ) {}

  async execute(command: DefineQuestion): Promise<CommandResult> {
    const userQuestions = await this.repository.findByAuthorId(command.authorId);

    const { state, events } = defineNewQuestion(userQuestions, command, this.currentTimeProvider);

    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
