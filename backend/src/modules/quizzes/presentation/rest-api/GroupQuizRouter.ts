import {CommandPublisher} from '../../../../shared/core/application/command/CommandBus';
import {DomainEventPublisher} from '../../../../shared/core/application/event/DomainEventBus';
import {QueryPublisher} from '../../../../shared/core/application/query/QueryBus';
import express, {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {FindCurrentQuizByGroupId} from '../../core/application/query/FindCurrentQuizByGroupId';
import {GroupQuiz} from '../../core/domain/GroupQuiz';
import {GroupQuizDto} from './response/GroupQuizDto';
import {PostQuizSolutionRequestBody} from './request/PostQuizSolutionRequestBody';
import {ResolveQuiz} from '../../core/application/command/ResolveQuiz';
import {FindQuizSolutions} from '../../core/application/query/FindQuizSolutions';
import {QuizSolution} from '../../core/domain/QuizSolution';
import {FindQuizById} from "../../core/application/query/FindQuizById";

export function groupQuizRouter(
    commandPublisher: CommandPublisher,
    eventPublisher: DomainEventPublisher,
    queryPublisher: QueryPublisher,
): express.Router {
  const getGroupQuiz = async (request: Request, response: Response) => {
    const groupId = request.query.groupId as string;
    const queryResult = await queryPublisher.execute<GroupQuiz | undefined>(new FindCurrentQuizByGroupId({groupId}));
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({message: `Quiz for group = ${groupId} not found!`});
    }
    const groupQuizDto: GroupQuizDto = {
      startedAt: queryResult.startedAt,
      quizId: queryResult.quizId,
      groupId: queryResult.groupId,
      answers: queryResult.answersToMatchRandomized(),
      users: queryResult.usersToMatchRandomized(),
    };
    return response.status(StatusCodes.OK).json(groupQuizDto);
  };

  const postQuizSolution = async (request: Request, response: Response) => {
    const quizId = request.params.quizId as string;
    const requestBody: PostQuizSolutionRequestBody = request.body;
    const solutionAuthorId = requestBody.solutionAuthorId ?? 'LoggedUserId';
    const commandResult = await commandPublisher.execute(ResolveQuiz.command({...requestBody, quizId: quizId, solutionAuthorId}));
    return commandResult.process(
        () => response.status(StatusCodes.OK).send(),
        (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({message: failureReason.message}),
    );
  };

  const getQuizSolutions = async (request: Request, response: Response) => {
    const quizId = request.params.quizId as string;
    const queryResult = await queryPublisher.execute<QuizSolution[]>(new FindQuizSolutions({quizId}));
    return response.status(StatusCodes.OK).json({items: queryResult});
  };

  const getUserSolutionAndScores = async (request: Request, response: Response) => {
    const quizId = request.params.quizId as string;
    const userId = request.params.userId as string;
    const allQuizSolutions = await queryPublisher.execute<QuizSolution[]>(new FindQuizSolutions({quizId}));
    const userQuizSolution = allQuizSolutions.find(solution => solution.solutionAuthorId === userId)
    if (!userQuizSolution) {
      return response.status(StatusCodes.NOT_FOUND).json({message: "Solution not found"})
    }
    const quiz = await queryPublisher.execute<GroupQuiz | undefined>(new FindQuizById({quizId}));
    if (!quiz) {
      return response.status(StatusCodes.NOT_FOUND).json({message: "Quiz not found"})
    }
    const userCorrectAnswers = userQuizSolution.solution
        .filter(userAnswer => quiz.answers.map(a => ({answerId: a.answerId, userId: a.userId})).includes(userAnswer))

    return response.status(StatusCodes.OK).json({...userQuizSolution, userCorrectAnswers});
  };

  const router = express.Router();
  router.get('/', getGroupQuiz);
  router.post('/:quizId/solutions', postQuizSolution);
  router.get('/:quizId/solutions', getQuizSolutions);
  router.get('/:quizId/solutions/:userId', getUserSolutionAndScores);
  return router;
}
