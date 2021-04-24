import express, { Request, Response } from 'express';
import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { StatusCodes } from 'http-status-codes';
import {
  FindCurrentGroupQuestionByGroupId,
  FindCurrentGroupQuestionByGroupIdResult,
} from '../../core/application/query/FindCurrentGroupQuestionByGroupId';

export function askingGroupQuestionRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const getCurrentGroupQuestionByGroupId = async (request: Request, response: Response) => {
    const { groupId } = request.params;
    const queryResult = await queryPublisher.execute<FindCurrentGroupQuestionByGroupIdResult>(
      new FindCurrentGroupQuestionByGroupId({ groupId }),
    );
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: `Current group question with id = ${groupId} not found!` });
    }
    return response.status(StatusCodes.OK).json(queryResult);
  };

  const router = express.Router();
  router.get('/:groupId', getCurrentGroupQuestionByGroupId);
  return router;
}
