import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindScoresByUserId, FindScoresByUserIdResult } from './FindScoresByUserId';
import { ScoresRepository } from '../ScoresRepository';

export class FindScoresByUserIdQueryHandler implements QueryHandler<FindScoresByUserId, FindScoresByUserIdResult> {
  constructor(private readonly repository: ScoresRepository) {}

  execute(query: FindScoresByUserId): Promise<FindScoresByUserIdResult> {
    return this.repository.findByUserId(query.userId);
  }
}
