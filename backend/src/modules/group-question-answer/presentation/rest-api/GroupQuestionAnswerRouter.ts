import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import { AnswerGroupQuestion } from '../../core/application/command/AnswerGroupQuestion';
import { StatusCodes } from 'http-status-codes';
import { PostAnswerGroupQuestionRequestBody } from './request/PostAnswerGroupQuestionRequestBody';
import { AnswerGroupQuestionRepository } from '../../core/application/AnswerGroupQuestionRepository';
import { AskingGroupQuestionRepository } from '../../../asking-question/core/application/AskingGroupQuestionRepository';
import { StartQuiz } from '../../../quizzes/core/application/command/StartQuiz';
import { EntityIdGenerator } from '../../../../shared/core/application/EntityIdGenerator';

export function groupQuestionAnswerRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
  groupQuestionAnsweredRepository: AnswerGroupQuestionRepository,
  askingGroupQuestionRepository: AskingGroupQuestionRepository,
  entityIdGenerator: EntityIdGenerator,
): express.Router {
  const postAnswerGroupQuestion = async (request: Request, response: Response) => {
    const { groupId } = request.params;
    const requestBody: PostAnswerGroupQuestionRequestBody = request.body;
    const { questionId, answerAuthorId, text } = requestBody;

    const commandResult = await commandPublisher.execute(
      new AnswerGroupQuestion({
        questionId,
        groupId,
        answerAuthorId,
        text,
      }),
    );

    return commandResult.process(
      () => response.status(StatusCodes.OK).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const postForceStartQuiz = async (request: Request, response: Response) => {
    const { groupId } = request.params;
    const questionAnswers = await groupQuestionAnsweredRepository.findAllByGroupId(groupId);
      console.log(questionAnswers)
    const currentQuestion = await askingGroupQuestionRepository.findByGroupId(groupId);
      console.log(currentQuestion);

    const commandResult = await commandPublisher.execute(
      StartQuiz.command({
        quizId: entityIdGenerator.generate(),
        groupId: groupId,
        question: { questionId: currentQuestion!.questionId, text: currentQuestion!.text },
        answers: questionAnswers!.map((question) => {
          return { answerId: question.answerAuthorId, userId: question.answerAuthorId, text: question.text };
        }),
      }),
    );

    return commandResult.process(
      () => response.status(StatusCodes.OK).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const router = express.Router();
  router.post('/:groupId/answers', postAnswerGroupQuestion);
  router.post('/:groupId/forceStartQuiz', postForceStartQuiz);
  return router;
}
