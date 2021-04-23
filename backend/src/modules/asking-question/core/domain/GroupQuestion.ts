import { CurrentTimeProvider } from '../../../../shared/core/CurrentTimeProvider';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { GroupQuestionWasAsked } from './event/GroupQuestionWasAsked';

export class GroupQuestion {
  readonly questionId: string;
  readonly groupId: string;
  readonly authorId: string;
  readonly text: string;

  constructor(props: { questionId: string; groupId: string; authorId: string; text: string }) {
    this.questionId = props.questionId;
    this.groupId = props.groupId;
    this.authorId = props.authorId;
    this.text = props.text;
  }
}

export function askGroupQuestion(
  command: { questionId: string; groupId: string; authorId: string; text: string },
  currentTimeProvider: CurrentTimeProvider,
): DomainCommandResult<GroupQuestion> {
  if (command.text.trim().length === 0) {
    throw new Error('Question cannot be empty!');
  }

  const groupQuestionWasAsked = new GroupQuestionWasAsked({
    occurredAt: currentTimeProvider(),
    questionId: command.questionId,
    groupId: command.groupId,
    askedBy: command.authorId,
    text: command.text,
  });

  const groupQuestion = new GroupQuestion({
    questionId: command.questionId,
    groupId: command.groupId,
    authorId: command.authorId,
    text: command.text,
  });

  return {
    state: groupQuestion,
    events: [groupQuestionWasAsked],
  };
}
