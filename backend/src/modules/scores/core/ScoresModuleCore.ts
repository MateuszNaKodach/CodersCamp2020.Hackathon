import { ModuleCore } from '../../../shared/core/ModuleCore';
import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { ScoresRepository } from './application/ScoresRepository';
import { SumUserScores } from './application/command/SumUserScores';
import { SumUserScoresCommandHandler } from './application/command/SumUserScoresCommandHandler';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { FindAllScores } from './application/query/FindAllScores';
import { FindAllScoresQueryHandler } from './application/query/FindAllScoresQueryHandler';
import { FindScoresByUserId } from './application/query/FindScoresByUserId';
import { FindScoresByUserIdQueryHandler } from './application/query/FindScoresByUserIdQueryHandler';

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
    queryHandlers: [
      {
        queryType: FindAllScores,
        handler: new FindAllScoresQueryHandler(scoresRepository),
      },
      {
        queryType: FindScoresByUserId,
        handler: new FindScoresByUserIdQueryHandler(scoresRepository),
      },
    ],
  };
}
