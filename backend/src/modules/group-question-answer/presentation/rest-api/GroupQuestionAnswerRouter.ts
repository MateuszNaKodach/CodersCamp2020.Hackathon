import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import { AnswerGroupQuestion } from '../../core/application/command/AnswerGroupQuestion';
import { StatusCodes } from 'http-status-codes';
import { PostAnswerGroupQuestionRequestBody } from './request/PostAnswerGroupQuestionRequestBody';
import { AnswerGroupQuestionRepository } from '../../core/application/AnswerGroupQuestionRepository';
import { StartQuiz } from '../../../quizzes/core/application/command/StartQuiz';
import { EntityIdGenerator } from '../../../../shared/core/application/EntityIdGenerator';
import { GroupQuestionsRepository } from '../../../questions/core/application/GroupQuestionsRepository';

export function groupQuestionAnswerRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
  groupQuestionAnsweredRepository: AnswerGroupQuestionRepository,
  GroupQuestionsRepository: GroupQuestionsRepository,
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
    console.log(questionAnswers);
    const currentQuestion = await GroupQuestionsRepository.findByGroupId(groupId);
    console.log(currentQuestion);

    const commandResult = await commandPublisher.execute(
      StartQuiz.command({
        quizId: entityIdGenerator.generate(),
        groupId: groupId,
        question: { questionId: currentQuestion!.questionAskedLastly!.questionId, text: currentQuestion!.questionAskedLastly!.text },
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
