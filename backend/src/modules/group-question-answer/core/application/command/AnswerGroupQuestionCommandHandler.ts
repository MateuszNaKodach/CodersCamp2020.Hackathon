import {CommandHandler} from '../../../../../shared/core/application/command/CommandHandler';
import {AnswerGroupQuestion} from './AnswerGroupQuestion';
import {CommandResult} from '../../../../../shared/core/application/command/CommandResult';
import {DomainEventPublisher} from '../../../../../shared/core/application/event/DomainEventBus';
import {CurrentTimeProvider} from '../../../../../shared/core/CurrentTimeProvider';
import {AnswerGroupQuestionRepository} from "../AnswerGroupQuestionRepository";
import {answerGroupQuestion} from "../domain/QuestionAnswer";

export class AnswerGroupQuestionCommandHandler implements CommandHandler<AnswerGroupQuestion> {
    constructor(private readonly eventPublisher: DomainEventPublisher, private readonly currentTimeProvider: CurrentTimeProvider, private readonly repository: AnswerGroupQuestionRepository) {
    }

    async execute(command: AnswerGroupQuestion): Promise<CommandResult> {
        const {state, events} = answerGroupQuestion(command, this.currentTimeProvider);

        await this.repository.save(state);
        this.eventPublisher.publishAll(events);
        return CommandResult.success();
    }
}
