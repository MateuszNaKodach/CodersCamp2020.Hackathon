import express, { Request, Response } from 'express';
import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { StatusCodes } from 'http-status-codes';
import { PostDefineQuestionsRequestBody } from './request/PostDefineQuestionsRequestBody';
import { DefineQuestion } from '../../core/application/command/DefineQuestion';
import { FindQuestionsByAuthorId, FindQuestionsByAuthorIdResult } from '../../core/application/query/FindQuestionsByAuthorId';
import { UserQuestionsDto } from './response/UserQuestionsDto';
import { GroupQuestionsRepository } from '../../core/application/GroupQuestionsRepository';
import { getQuestionsToAsk } from '../../core/application/event/TimeHasPassedEventHandler';

export function questionsRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
  groupQuestionsRepository: GroupQuestionsRepository,
): express.Router {
  const postDefineQuestion = async (request: Request, response: Response) => {
    const { userId } = request.params;
    const requestBody: PostDefineQuestionsRequestBody = request.body;
    const questionId = requestBody.questionId;
    const groupId = requestBody.groupId;
    const text = requestBody.text;
    const commandResult = await commandPublisher.execute(
      new DefineQuestion({
        questionId,
        groupId,
        text,
        authorId: userId,
      }),
    );
    return commandResult.process(
      () => response.status(StatusCodes.OK).json().send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const getQuestionsByAuthorId = async (request: Request, response: Response) => {
    const { userId } = request.params;
    const queryResult = await queryPublisher.execute<FindQuestionsByAuthorIdResult>(new FindQuestionsByAuthorId({ authorId: userId }));
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: `User with id = ${userId} did not define any question.` });
    }
    return response.status(StatusCodes.OK).json(
      new UserQuestionsDto({
        authorId: userId,
        questions: queryResult.questions,
      }),
    );
  };

  const postForceAskGroupQuestion = async (request: Request, response: Response) => {
    const { groupId } = request.params;
    const questions = await groupQuestionsRepository.findByGroupId(groupId);
    if (!questions) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: `Group questions with id = ${groupId} does not exist.` });
    } else {
      await getQuestionsToAsk(questions, commandPublisher);
      return response.status(StatusCodes.OK).json().send();
    }
  };

  const router = express.Router();
  router.post('/:userId', postDefineQuestion);
  router.get('/:userId', getQuestionsByAuthorId);
  router.post('/force/:groupId', postForceAskGroupQuestion);
  return router;
}
