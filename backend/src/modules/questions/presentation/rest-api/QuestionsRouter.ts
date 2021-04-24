import express, { Request, Response } from 'express';
import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { StatusCodes } from 'http-status-codes';
import { PostDefineQuestionsRequestBody } from './request/PostDefineQuestionsRequestBody';
import { DefineQuestion } from '../../core/application/command/DefineQuestion';

export function questionsRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const postDefineQuestion = async (request: Request, response: Response) => {
    const { userId } = request.params;
    const requestBody: PostDefineQuestionsRequestBody = request.body;
    const questionId = requestBody.questionId;
    const groupId = requestBody.groupId;
    const text = requestBody.text;
    const commandResult = await commandPublisher.execute(new DefineQuestion({
      questionId,
      groupId,
      text,
      authorId: userId,
    }));
    return commandResult.process(
      () => response.status(StatusCodes.OK).json().send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const router = express.Router();
  router.post('/:userId', postDefineQuestion);
  return router;
}
