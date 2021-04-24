import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindQuestionsByAuthorId, FindQuestionsByAuthorIdResult } from './FindQuestionsByAuthorId';
import { UserQuestionsRepository } from '../UserQuestionsRepository';

export class FindQuestionsByAuthorIdQueryHandler implements QueryHandler<FindQuestionsByAuthorId, FindQuestionsByAuthorIdResult> {
  constructor(private readonly repository: UserQuestionsRepository) {}

  execute(query: FindQuestionsByAuthorId): Promise<FindQuestionsByAuthorIdResult> {
    return this.repository.findByAuthorId(query.authorId);
  }
}
