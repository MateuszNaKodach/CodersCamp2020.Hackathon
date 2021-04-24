import { QuizSolution } from '../domain/QuizSolution';

export interface QuizSolutionsRepository {
  findByQuizIdAndSolutionAuthorId(quizId: string, solutionAuthorId: string): Promise<QuizSolution | undefined>;

  save(quiz: QuizSolution): Promise<void>;
}
