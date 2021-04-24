import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { ScoresRepository } from '../ScoresRepository';
import { FindAllScores, FindAllScoresResult } from './FindAllScores';

export class FindAllScoresQueryHandler implements QueryHandler<FindAllScores, FindAllScoresResult> {
  constructor(private readonly repository: ScoresRepository) {}

  execute(): Promise<FindAllScoresResult> {
    return this.repository.findAll();
  }
}
