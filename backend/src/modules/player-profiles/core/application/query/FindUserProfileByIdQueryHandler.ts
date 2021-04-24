import {QueryHandler} from '../../../../../shared/core/application/query/QueryHandler';
import {FindUserProfileById, FindUserProfileByIdResult} from './FindUserProfileById';
import {UserProfilesRepository} from '../UserProfilesRepository';

export class FindUserProfileByIdQueryHandler implements QueryHandler<FindUserProfileById, FindUserProfileByIdResult> {
  constructor(private readonly repository: UserProfilesRepository) {}

  execute(query: FindUserProfileById): Promise<FindUserProfileByIdResult> {
    return this.repository.findByPlayerId(query.userId);
  }
}
