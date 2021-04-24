import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { ResolveQuiz } from './ResolveQuiz';
import { QuizSolutionsRepository } from '../QuizSolutionsRepository';
import { resolveQuiz } from '../../domain/QuizSolution';

export class ResolveQuizCommandHandler implements CommandHandler<ResolveQuiz> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: QuizSolutionsRepository,
  ) {}

  async execute(command: ResolveQuiz): Promise<CommandResult> {
    const userSolution = await this.repository.findByQuizIdAndSolutionAuthorId(command.quizId, command.solutionAuthorId);
    const { state, events } = resolveQuiz(userSolution, command, this.currentTimeProvider());
    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
