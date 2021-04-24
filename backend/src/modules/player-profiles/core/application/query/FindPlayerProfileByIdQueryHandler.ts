import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindPlayerProfileById, FindPlayerProfileByIdResult } from './FindPlayerProfileById';
import { PlayerProfilesRepository } from '../PlayerProfilesRepository';

export class FindPlayerProfileByIdQueryHandler implements QueryHandler<FindPlayerProfileById, FindPlayerProfileByIdResult> {
  constructor(private readonly repository: PlayerProfilesRepository) {}

  execute(query: FindPlayerProfileById): Promise<FindPlayerProfileByIdResult> {
    return this.repository.findByPlayerId(query.playerId);
  }
}
