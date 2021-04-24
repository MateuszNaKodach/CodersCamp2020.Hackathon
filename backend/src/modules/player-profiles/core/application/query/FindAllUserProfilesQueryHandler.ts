import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindAllUserProfiles, FindAllUserProfilesResult } from './FindAllUserProfiles';
import { UserProfilesRepository } from '../UserProfilesRepository';

export class FindAllUserProfilesQueryHandler implements QueryHandler<FindAllUserProfiles, FindAllUserProfilesResult> {
  constructor(private readonly repository: UserProfilesRepository) {}

  execute(query: FindAllUserProfiles): Promise<FindAllUserProfilesResult> {
    return this.repository.findAll();
  }
}
