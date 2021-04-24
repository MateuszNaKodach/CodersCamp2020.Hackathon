import {CommandPublisher} from "../../../../shared/core/application/command/CommandBus";
import {DomainEventPublisher} from "../../../../shared/core/application/event/DomainEventBus";
import {QueryPublisher} from "../../../../shared/core/application/query/QueryBus";
import express, {Request, Response} from "express";

export function groupQuizRouter(
    commandPublisher: CommandPublisher,
    eventPublisher: DomainEventPublisher,
    queryPublisher: QueryPublisher,
): express.Router {

  const getGroupQuiz = async (request: Request, response: Response) => {
    const { groupId } = request.params;

  }

  const router = express.Router();
  router.get('/:groupId', getGroupQuiz);
  return router;
}
