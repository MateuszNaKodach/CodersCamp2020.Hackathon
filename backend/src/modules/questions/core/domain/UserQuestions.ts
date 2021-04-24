import { CurrentTimeProvider } from '../../../../shared/core/CurrentTimeProvider';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { QuestionWasDefined } from './event/QuestionWasDefined';
import { Question } from './Question';

export class UserQuestions {
  readonly authorId: string;
  readonly questions: Question[];

  constructor(props: { authorId: string; questions: Question[] }) {
    this.authorId = props.authorId;
    this.questions = props.questions;
  }
}

export function defineNewQuestion(
  state: UserQuestions | undefined,
  command: { questionId: string; groupId: string; text: string; authorId: string },
  currentTimeProvider: CurrentTimeProvider,
): DomainCommandResult<UserQuestions> {
  const userQuestionInGroup = state?.questions.find((question) => question.groupId === command.groupId);
  const questionId = command.questionId;
  const groupId = command.groupId;
  const text = command.text;
  const authorId = command.authorId;

  if (userQuestionInGroup?.questionId === questionId) {
    throw new Error(`Question already exists.`);
  }

  const questions = state?.questions.map((question) =>
    question.groupId === groupId
      ? {
        ...question,
        questionId,
        text,
      }
      : question,
  );
  const userQuestions = new UserQuestions({
    authorId,
    questions: questions ? [...questions] : [],
  });

  const questionWasDefined = new QuestionWasDefined({
    occurredAt: currentTimeProvider(),
    questionId,
    groupId,
    text,
    authorId,
  });

  const userQuestionsWithNewQuestion = onQuestionWasDefined(userQuestions, questionWasDefined);

  return {
    state: userQuestionsWithNewQuestion,
    events: [questionWasDefined],
  };
}

function onQuestionWasDefined(userQuestions: UserQuestions, event: QuestionWasDefined): UserQuestions {
  const definedQuestion = new Question({
    questionId: event.questionId,
    groupId: event.groupId,
    text: event.text,
    authorId: event.authorId,
  });
  return new UserQuestions({
    authorId: event.authorId,
    questions: [...userQuestions.questions, definedQuestion],
  });
}
