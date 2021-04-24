import { QuizSolution } from '../domain/QuizSolution';

export interface QuizSolutionsRepository {
  findByQuizId(quizId: string): Promise<QuizSolution[]>;

  findByQuizIdAndSolutionAuthorId(quizId: string, solutionAuthorId: string): Promise<QuizSolution | undefined>;

  save(quiz: QuizSolution): Promise<void>;
}
