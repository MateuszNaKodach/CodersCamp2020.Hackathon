import { testModuleRestApi } from '../../../../test-support/shared/presentation/rest-api/TestModuleRestApi';
import { StatusCodes } from 'http-status-codes';
import { CommandPublisherMock } from '../../../../test-support/shared/core/CommandPublisherMock';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import { QuestionsRestApiModule } from '../../../../../src/modules/questions/presentation/rest-api/QuestionsRestApiModule';
import { DefineQuestion } from '../../../../../src/modules/questions/core/application/command/DefineQuestion';

describe('Questions REST API', () => {
  const questionId = 'SampleQuestionId';
  const groupId = 'SampleGroupId';
  const text = 'Sample question for the group';

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
        authorId: 'sampleUserId',
      }),
    );
    expect(status).toBe(StatusCodes.OK);
    expect(body).toBeEmpty();
  });

  it('POST /rest-api/questions/:userId | when command failure', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('Question already exist.')));
    const { agent } = testModuleRestApi(QuestionsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/questions/sampleUserId').send({ questionId, groupId, text });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(
      new DefineQuestion({
        questionId,
        groupId,
        text,
        authorId: 'sampleUserId',
      }),
    );
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Question already exist.' });
  });
});
