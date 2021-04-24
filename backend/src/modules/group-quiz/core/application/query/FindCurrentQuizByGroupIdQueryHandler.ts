import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindCurrentQuizByGroupId } from './FindCurrentQuizByGroupId';
import { GroupQuizRepository } from '../GroupQuizRepository';
import { GroupQuiz } from '../../domain/GroupQuiz';

export class FindCurrentQuizByGroupIdQueryHandler implements QueryHandler<FindCurrentQuizByGroupId> {
  private readonly repository: GroupQuizRepository;

  constructor(repository: GroupQuizRepository) {
    this.repository = repository;
  }

  async execute(query: FindCurrentQuizByGroupId): Promise<GroupQuiz | undefined> {
    const quizesForGroup = await this.repository.findByGroupId(query.groupId);
    if (quizesForGroup.length === 0) {
      return undefined;
    }
    return quizesForGroup.sort((a, b) => b.startedAt.getDate() - a.startedAt.getDate())[0];
  }
}
