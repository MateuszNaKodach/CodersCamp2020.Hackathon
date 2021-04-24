import {CommandHandler} from '../../../../../shared/core/application/command/CommandHandler';
import {AnswerGroupQuestion} from './AnswerGroupQuestion';
import {CommandResult} from '../../../../../shared/core/application/command/CommandResult';
import {DomainEventPublisher} from '../../../../../shared/core/application/event/DomainEventBus';
import {CurrentTimeProvider} from '../../../../../shared/core/CurrentTimeProvider';
import {PlayerId} from '../../../../../shared/core/domain/PlayerId';

export class AnswerGroupQuestionCommandHandler implements CommandHandler<AnswerGroupQuestion> {
  constructor(
     private readonly eventPublisher: DomainEventPublisher,
     private readonly currentTimeProvider: CurrentTimeProvider,
  ) {

  }

  async execute(command: AnswerGroupQuestion): Promise<CommandResult> {
    return CommandResult.success();
  }
}
