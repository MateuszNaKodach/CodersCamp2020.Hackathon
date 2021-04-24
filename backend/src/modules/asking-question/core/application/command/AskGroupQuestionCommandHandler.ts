import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { AskGroupQuestion } from './AskGroupQuestion';
import { GroupQuestionsRepository } from '../../../../questions/core/application/GroupQuestionsRepository';
import { askGroupQuestion } from '../../../../questions/core/domain/GroupQuestions';

export class AskGroupQuestionCommandHandler implements CommandHandler<AskGroupQuestion> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: GroupQuestionsRepository,
  ) {}

  async execute(command: AskGroupQuestion): Promise<CommandResult> {
    const groupQuestions = await this.repository.findByGroupId(command.groupId);

    if (groupQuestions) {
      const { state, events } = askGroupQuestion(groupQuestions, command, this.currentTimeProvider);

      await this.repository.save(state);
      this.eventPublisher.publishAll(events);
    }
    return CommandResult.success();
  }
}
