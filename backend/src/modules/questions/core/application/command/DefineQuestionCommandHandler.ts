import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { QuestionsRepository } from '../QuestionsRepository';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { DefineQuestion } from './DefineQuestion';
import { UserQuestions } from '../../domain/UserQuestions';
import { QuestionWasDefined } from '../../domain/event/QuestionWasDefined';

export class DefineQuestionCommandHandler implements CommandHandler<DefineQuestion> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: QuestionsRepository,
  ) {
  }

  async execute(command: DefineQuestion): Promise<CommandResult> {
    const state = new UserQuestions();
    const event = new QuestionWasDefined({
      occurredAt: this.currentTimeProvider(),
    });

    await this.repository.save(state);
    this.eventPublisher.publish(event);
    return CommandResult.success();
  }
}
