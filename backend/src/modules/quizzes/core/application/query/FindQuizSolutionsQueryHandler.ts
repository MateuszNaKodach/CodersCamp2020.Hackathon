import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindQuizSolutions } from './FindQuizSolutions';
import { QuizSolutionsRepository } from '../QuizSolutionsRepository';
import { QuizSolution } from '../../domain/QuizSolution';

export class FindQuizSolutionsQueryHandler implements QueryHandler<FindQuizSolutions> {
  private readonly repository: QuizSolutionsRepository;

  constructor(repository: QuizSolutionsRepository) {
    this.repository = repository;
  }

  async execute(query: FindQuizSolutions): Promise<QuizSolution[]> {
    return await this.repository.findByQuizId(query.quizId);
  }
}
