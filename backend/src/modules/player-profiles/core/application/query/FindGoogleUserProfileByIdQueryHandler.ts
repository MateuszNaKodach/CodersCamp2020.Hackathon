import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindGoogleUserProfileById, FindUserProfileByIdResult } from './FindGoogleUserProfileById';
import { GoogleUserProfilesRepository } from '../GoogleUserProfilesRepository';

export class FindGoogleUserProfileByIdQueryHandler implements QueryHandler<FindGoogleUserProfileById, FindUserProfileByIdResult> {
  constructor(private readonly repository: GoogleUserProfilesRepository) {}

  execute(query: FindGoogleUserProfileById): Promise<FindUserProfileByIdResult> {
    return this.repository.findByPlayerId(query.userId);
  }
}
