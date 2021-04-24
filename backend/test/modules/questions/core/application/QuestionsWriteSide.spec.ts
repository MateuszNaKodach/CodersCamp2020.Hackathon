import 'jest-extended';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import Failure = CommandResult.Failure;
import { testQuestionsModule } from './TestQuestionsModule';
import { DefineQuestion } from '../../../../../src/modules/questions/core/application/command/DefineQuestion';
import { QuestionWasDefined } from '../../../../../src/modules/questions/core/domain/event/QuestionWasDefined';

describe('Questions | Write Side', () => {
  const currentTime = new Date();
  const questionId = 'SampleQuestionId';
  const groupId = 'SampleGroupId';
  const text = 'Sample question for the group';
  const authorId = 'SampleUserId';
  const questionsModule = testQuestionsModule(currentTime);
  const defineQuestion = new DefineQuestion({
    questionId,
    groupId,
    text,
    authorId,
  });

  it('When define question, then question was defined', async () => {
    //When
    const commandResult = await questionsModule.executeCommand(defineQuestion);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(questionsModule.lastPublishedEvent()).toStrictEqual(
      new QuestionWasDefined({ occurredAt: currentTime, questionId, groupId, text, authorId }),
    );
  });

  it('Given question defined, when try to define new question of the same author and group, then new question was defined', async () => {
    //Given
    await questionsModule.executeCommand(defineQuestion);
    const newQuestionId = 'newQuestionId';

    //When
    const defineNewQuestion = new DefineQuestion({
      questionId: newQuestionId,
      groupId,
      text,
      authorId,
    });
    const commandResult = await questionsModule.executeCommand(defineNewQuestion);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(questionsModule.lastPublishedEvent()).toStrictEqual(
      new QuestionWasDefined({ occurredAt: currentTime, questionId: newQuestionId, groupId, text, authorId }),
    );
  });

  it('Given question defined, when try to define question with the same id, then command should fail', async () => {
    //Given
    await questionsModule.executeCommand(defineQuestion);

    //When
    const commandResult = await questionsModule.executeCommand(defineQuestion);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Question already exists.'));
  });
});
