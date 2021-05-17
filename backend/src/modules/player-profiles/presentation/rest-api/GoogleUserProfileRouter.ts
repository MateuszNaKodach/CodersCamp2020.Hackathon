import express, { Request, Response } from 'express';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { StatusCodes } from 'http-status-codes';
import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { FindGoogleUserProfileById, FindUserProfileByIdResult } from '../../core/application/query/FindGoogleUserProfileById';
import { CreateGoogleUserProfile } from '../../core/application/command/CreateGoogleUserProfile';
import { PostGoogleUserProfileRequestBody } from './request/PostGoogleUserProfileRequestBody';

export function googleUserProfileRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const createUserProfile = async (request: Request, response: Response) => {
    const { userId } = request.params;
    const requestBody: PostGoogleUserProfileRequestBody = request.body;
    const commandResult = await commandPublisher.execute(new CreateGoogleUserProfile({ userId, displayName: requestBody.displayName }));
    return commandResult.process(
      () => response.status(StatusCodes.CREATED).json(requestBody).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const getUserProfileById = async (request: Request, response: Response) => {
    const { userId } = request.params;
    const queryResult = await queryPublisher.execute<FindUserProfileByIdResult>(new FindGoogleUserProfileById({ userId }));
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: `Player profile with id = ${userId} not found!` });
    }
    return response.status(StatusCodes.OK).json(queryResult);
  };

  const router = express.Router();
  router.post('/:userId/display-name', createUserProfile);
  router.get('/:userId/display-name', getUserProfileById);
  return router;
}
