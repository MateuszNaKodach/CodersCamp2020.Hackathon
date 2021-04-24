import express, { Request, Response } from 'express';
import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { StatusCodes } from 'http-status-codes';

export function groupsRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const getAllGroups = async (request: Request, response: Response) => {
    return response.status(StatusCodes.OK).json({
      items: [
        {
          groupId: 'group1',
          groupName: 'Team Backend',
        },
        {
          groupId: 'group2',
          groupName: 'Team Frontend',
        },
        {
          groupId: 'group3',
          groupName: 'Team HR',
        },
      ],
    });
  };

  const router = express.Router();
  router.get('/', getAllGroups);
  return router;
}
