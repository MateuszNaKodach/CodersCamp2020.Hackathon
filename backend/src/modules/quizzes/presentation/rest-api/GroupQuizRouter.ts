import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FindCurrentQuizByGroupId } from '../../core/application/query/FindCurrentQuizByGroupId';
import { GroupQuiz } from '../../core/domain/GroupQuiz';
import { GroupQuizDto } from './GroupQuizDto';

export function groupQuizRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const getGroupQuiz = async (request: Request, response: Response) => {
    const groupId = request.query.groupId as string;
    const queryResult = await queryPublisher.execute<GroupQuiz | undefined>(new FindCurrentQuizByGroupId({ groupId }));
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: `Quiz for group = ${groupId} not found!` });
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

  const router = express.Router();
  router.get('/', getGroupQuiz);
  return router;
}
