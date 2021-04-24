import { Question } from './Question';
import { CurrentTimeProvider } from '../../../../shared/core/CurrentTimeProvider';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { GroupQuestionWasAsked } from '../../../asking-question/core/domain/event/GroupQuestionWasAsked';

export class GroupQuestions {
  readonly groupId: string;
  readonly questionAskedLastly: Question | undefined;
  readonly questionAskedLastlyDate: Date;
  readonly questionList: Question[];

  constructor(props: {
    groupId: string;
    questionAskedLastly: Question | undefined;
    questionAskedLastlyDate: Date;
    questionList: Question[];
  }) {
    this.groupId = props.groupId;
    this.questionAskedLastly = props.questionAskedLastly;
    this.questionAskedLastlyDate = props.questionAskedLastlyDate;
    this.questionList = props.questionList;
  }
}

export function askGroupQuestion(
  groupQuestions: GroupQuestions,
  command: { questionId: string; groupId: string; authorId: string; text: string },
  currentTimeProvider: CurrentTimeProvider,
): DomainCommandResult<GroupQuestions> {
  if (command.questionId.trim().length <= 0) {
    throw new Error('QuestionId cannot be empty!');
  }
  if (command.groupId.trim().length <= 0) {
    throw new Error('GroupId cannot be empty!');
  }
  if (command.authorId.trim().length <= 0) {
    throw new Error('AuthorId cannot be empty!');
  }
  if (command.text.trim().length <= 0) {
    throw new Error('Question cannot be empty!');
  }

  const groupQuestionWasAsked = new GroupQuestionWasAsked({
    occurredAt: currentTimeProvider(),
    questionId: command.questionId,
    groupId: command.groupId,
    askedBy: command.authorId,
    text: command.text,
  });

  const groupQuestion = new GroupQuestions({
    questionList: groupQuestions.questionList,
    questionAskedLastlyDate: currentTimeProvider(),
    groupId: groupQuestions!.groupId,
    questionAskedLastly: {
      questionId: command.questionId,
      text: command.text,
      authorId: command.authorId,
      groupId: command.groupId,
    },
  });

  return {
    state: groupQuestion,
    events: [groupQuestionWasAsked],
  };
}
