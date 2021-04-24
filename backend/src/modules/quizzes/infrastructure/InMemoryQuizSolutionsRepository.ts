import { QuizSolution } from '../core/domain/QuizSolution';
import { QuizSolutionsRepository } from '../core/application/QuizSolutionsRepository';

export class InMemoryQuizSolutionsRepository implements QuizSolutionsRepository {
  private readonly entities: { [solutionId: string]: QuizSolution } = {};

  findByQuizId(quizId: string): Promise<QuizSolution[]> {
    const result = Object.values(this.entities).filter((solution) => solution.quizId === quizId);
    return Promise.resolve(result);
  }

  findByQuizIdAndSolutionAuthorId(quizId: string, solutionAuthorId: string): Promise<QuizSolution | undefined> {
    const result = Object.values(this.entities).find(
      (solution) => solution.quizId === quizId && solution.solutionAuthorId === solutionAuthorId,
    );
    return Promise.resolve(result);
  }

  save(quiz: QuizSolution): Promise<void> {
    const solutionId = `${quiz.quizId}_${quiz.solutionAuthorId}`;
    this.entities[solutionId] = quiz;
    return Promise.resolve();
  }
}
