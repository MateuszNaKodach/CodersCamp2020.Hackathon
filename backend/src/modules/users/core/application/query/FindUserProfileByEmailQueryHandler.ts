import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindUserProfileByEmail, FindUserProfileByEmailResult } from './FindUserProfileByEmail';
import { UserProfileRepository } from '../UserProfileRepository';

export class FindUserProfileByEmailQueryHandler implements QueryHandler<FindUserProfileByEmail, FindUserProfileByEmailResult> {
  constructor(private readonly repository: UserProfileRepository) {}

  execute(query: FindUserProfileByEmail): Promise<FindUserProfileByEmailResult> {
    return this.repository.findByUserEmail(query.email);
  }
}