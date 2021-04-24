import { ModuleCore } from '../../../shared/core/ModuleCore';
import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { ScoresRepository } from './application/ScoresRepository';
import { SumUserScores } from './application/command/SumUserScores';
import { SumUserScoresCommandHandler } from './application/command/SumUserScoresCommandHandler';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';

export function ScoresModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  scoresRepository: ScoresRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: SumUserScores,
        handler: new SumUserScoresCommandHandler(eventPublisher, scoresRepository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [],
  };
}
