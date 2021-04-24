import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { GroupQuizRepository } from '../GroupQuizRepository';
import { GroupQuiz } from '../../domain/GroupQuiz';
import {FindQuizById} from "./FindQuizById";

export class FindQuizByIdQueryHandler implements QueryHandler<FindQuizById> {
  private readonly repository: GroupQuizRepository;

  constructor(repository: GroupQuizRepository) {
    this.repository = repository;
  }

  async execute(query: FindQuizById): Promise<GroupQuiz | undefined> {
    return await this.repository.findByQuizId(query.quizId);
  }
}
