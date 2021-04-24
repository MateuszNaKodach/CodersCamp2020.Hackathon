import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindCurrentGroupQuestionByGroupId, FindCurrentGroupQuestionByGroupIdResult } from './FindCurrentGroupQuestionByGroupId';
import { GroupQuestionsRepository } from '../GroupQuestionsRepository';

export class FindCurrentGroupQuestionByGroupIdQueryHandler
  implements QueryHandler<FindCurrentGroupQuestionByGroupId, FindCurrentGroupQuestionByGroupIdResult> {
  constructor(private readonly repository: GroupQuestionsRepository) {}

  execute(query: FindCurrentGroupQuestionByGroupId): Promise<FindCurrentGroupQuestionByGroupIdResult> {
    return this.repository.findByGroupId(query.groupId);
  }
}
