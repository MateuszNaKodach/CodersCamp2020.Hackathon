import express, { Request, Response } from 'express';
import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { StatusCodes } from 'http-status-codes';
import { FindScoresByUserId, FindScoresByUserIdResult } from '../../core/application/query/FindScoresByUserId';
import { UserScoresDto } from './response/UserScoresDto';
import { FindAllScores, FindAllScoresResult } from '../../core/application/query/FindAllScores';

export function scoresRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const getAllScores = async (request: Request, response: Response) => {
    const queryResult = await queryPublisher.execute<FindAllScoresResult>(new FindAllScores());
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: 'Scores are empty.' });
    }
    return response.status(StatusCodes.OK).json(
      queryResult.map(
        (result) =>
          new UserScoresDto({
            userId: result.userId,
            score: result.score,
          }),
      ),
    );
  };

  const getScoresByUserId = async (request: Request, response: Response) => {
    const { userId } = request.params;
    const queryResult = await queryPublisher.execute<FindScoresByUserIdResult>(new FindScoresByUserId({ userId }));
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: `User with id = ${userId} did not get any score.` });
    }
    return response.status(StatusCodes.OK).json(
      new UserScoresDto({
        userId,
        score: queryResult.score,
      }),
    );
  };

  const router = express.Router();
  router.get('/', getAllScores);
  router.get('/:userId', getScoresByUserId);
  return router;
}
