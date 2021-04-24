import 'jest-extended';
import { testQuestionsModule } from './TestQuestionsModule';
import {
  FindQuestionsByAuthorId,
  FindQuestionsByAuthorIdResult,
} from '../../../../../src/modules/questions/core/application/query/FindQuestionsByAuthorId';
import { DefineQuestion } from '../../../../../src/modules/questions/core/application/command/DefineQuestion';
import { Question } from '../../../../../src/modules/questions/core/domain/Question';
import { UserQuestions } from '../../../../../src/modules/questions/core/domain/UserQuestions';

describe('Questions | Query Side', () => {
  const currentTime = new Date();
  const questionId = 'SampleQuestionId';
  const groupId = 'SampleGroupId';
  const text = 'Sample question for the group';
  const authorId = 'SampleUserId';
  const questionId2 = 'SampleQuestionId2';
  const groupId2 = 'SampleGroupId2';
  const text2 = 'Sample question for another group';

  it('FindQuestionsByAuthorIdResult | Questions by authorId exist', async () => {
    //Given
    const questionsModule = testQuestionsModule(currentTime);
    const defineQuestion = new DefineQuestion({
      questionId,
      groupId,
      text,
      authorId,
    });
    await questionsModule.executeCommand(defineQuestion);
    const defineQuestion2 = new DefineQuestion({
      questionId: questionId2,
      groupId: groupId2,
      text: text2,
      authorId,
    });
    await questionsModule.executeCommand(defineQuestion2);

    //When
    const findQuestionsByAuthorIdResult = await questionsModule.executeQuery<FindQuestionsByAuthorIdResult>(
      new FindQuestionsByAuthorId({ authorId }),
    );

    //Then
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
    expect(findQuestionsByAuthorIdResult).toStrictEqual(
      new UserQuestions({
        authorId,
        questions: [question1, question2],
      }),
    );
  });

  it('FindQuestionsByAuthorIdResult | Question was changed by author', async () => {
    //Given
    const questionsModule = testQuestionsModule(currentTime);
    const defineQuestion = new DefineQuestion({
      questionId,
      groupId,
      text,
      authorId,
    });
    await questionsModule.executeCommand(defineQuestion);
    const defineQuestion2 = new DefineQuestion({
      questionId: questionId2,
      groupId,
      text: text2,
      authorId,
    });
    await questionsModule.executeCommand(defineQuestion2);

    //When
    const findQuestionsByAuthorIdResult = await questionsModule.executeQuery<FindQuestionsByAuthorIdResult>(
      new FindQuestionsByAuthorId({ authorId }),
    );

    //Then
    const question2 = new Question({
      questionId: questionId2,
      groupId,
      text: text2,
      authorId,
    });
    expect(findQuestionsByAuthorIdResult).toStrictEqual(
      new UserQuestions({
        authorId,
        questions: [question2],
      }),
    );
  });

  it('FindQuestionsByAuthorIdResult | Questions by authorId not exist', async () => {
    //When
    const questionsModule = testQuestionsModule(currentTime);
    const findQuestionsByAuthorIdResult = await questionsModule.executeQuery<FindQuestionsByAuthorIdResult>(
      new FindQuestionsByAuthorId({ authorId }),
    );

    //Then
    expect(findQuestionsByAuthorIdResult).toBeUndefined();
  });
});
