import { testModuleRestApi } from '../../../../test-support/shared/presentation/rest-api/TestModuleRestApi';
import { StatusCodes } from 'http-status-codes';
import { CommandPublisherMock } from '../../../../test-support/shared/core/CommandPublisherMock';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import { QuestionsRestApiModule } from '../../../../../src/modules/questions/presentation/rest-api/QuestionsRestApiModule';
import { DefineQuestion } from '../../../../../src/modules/questions/core/application/command/DefineQuestion';
import { QueryPublisherMock } from '../../../../test-support/shared/core/QueryPublisherMock';
import { Question } from '../../../../../src/modules/questions/core/domain/Question';
import { UserQuestions } from '../../../../../src/modules/questions/core/domain/UserQuestions';
import { FindQuestionsByAuthorId } from '../../../../../src/modules/questions/core/application/query/FindQuestionsByAuthorId';

describe('Questions REST API', () => {
  const questionId = 'SampleQuestionId';
  const groupId = 'SampleGroupId';
  const text = 'Sample question for the group';
  const authorId = 'sampleUserId';
  const questionId2 = 'SampleQuestionId2';
  const groupId2 = 'SampleGroupId2';
  const text2 = 'Sample question for another group';

  it('POST /rest-api/questions/:userId | when command success', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.success());
    const { agent } = testModuleRestApi(QuestionsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/questions/sampleUserId').send({ questionId, groupId, text });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(
      new DefineQuestion({
        questionId,
        groupId,
        text,
        authorId,
      }),
    );
    expect(status).toBe(StatusCodes.OK);
    expect(body).toBeEmpty();
  });

  it('POST /rest-api/questions/:userId | when command failure', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('Question already exists.')));
    const { agent } = testModuleRestApi(QuestionsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/questions/sampleUserId').send({ questionId, groupId, text });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(
      new DefineQuestion({
        questionId,
        groupId,
        text,
        authorId,
      }),
    );
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Question already exists.' });
  });

  it('GET /rest-api/questions/:userId | when tournament with given id found', async () => {
    //Given
    const question1 = new Question({
      questionId,
      groupId,
      text,
      authorId,
    });
    const question2 = new Question({
      questionId: questionId2,
      groupId: groupId2,
      text: text2,
      authorId,
    });
    const queryPublisher = QueryPublisherMock(new UserQuestions({ authorId, questions: [question1, question2] }));
    const { agent } = testModuleRestApi(QuestionsRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/questions/sampleUserId').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindQuestionsByAuthorId({ authorId }));
    expect(status).toBe(StatusCodes.OK);
    expect(body).toStrictEqual({ authorId, questions: [{ ...question1 }, { ...question2 }] });
  });

  it('GET /rest-api/questions/:userId | when user with given id not found', async () => {
    //Given
    const queryPublisher = QueryPublisherMock(undefined);
    const { agent } = testModuleRestApi(QuestionsRestApiModule, { queryPublisher });
    //When
    const { body, status } = await agent.get('/rest-api/questions/sampleUserId').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindQuestionsByAuthorId({ authorId }));
    expect(status).toBe(StatusCodes.NOT_FOUND);
    expect(body).toStrictEqual({ message: 'User with id = sampleUserId did not define any question.' });
  });
});
