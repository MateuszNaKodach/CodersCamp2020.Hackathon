import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import { AnswerGroupQuestion } from '../../core/application/command/AnswerGroupQuestion';
import { StatusCodes } from 'http-status-codes';
import { PostAnswerGroupQuestionRequestBody } from './request/PostAnswerGroupQuestionRequestBody';

export function groupQuestionAnswerRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const postAnswerGroupQuestion = async (request: Request, response: Response) => {
    const { groupId } = request.params;
    const requestBody: PostAnswerGroupQuestionRequestBody = request.body;
    const { questionId, answerAuthorId, text } = requestBody;

    const commandResult = await commandPublisher.execute(
      new AnswerGroupQuestion({
        questionId,
        groupId: groupId,
        answerAuthorId,
        text,
      }),
    );

    return commandResult.process(
      () => response.status(StatusCodes.OK).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const router = express.Router();
  router.post('/', postAnswerGroupQuestion);
  return router;
}
