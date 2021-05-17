import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindAllGoogleUserProfiles, FindAllUserProfilesResult } from './FindAllGoogleUserProfiles';
import { GoogleUserProfilesRepository } from '../GoogleUserProfilesRepository';

export class FindAllGoogleUserProfilesQueryHandler implements QueryHandler<FindAllGoogleUserProfiles, FindAllUserProfilesResult> {
  constructor(private readonly repository: GoogleUserProfilesRepository) {}

  execute(query: FindAllGoogleUserProfiles): Promise<FindAllUserProfilesResult> {
    return this.repository.findAll();
  }
}
