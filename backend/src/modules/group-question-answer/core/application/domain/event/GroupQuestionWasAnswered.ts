export class GroupQuestionWasAnswered {
  readonly occurredAt: Date;
  readonly questionId: string;
  readonly groupId: string;
  readonly answerAuthorId: string;
  readonly text: string;

  constructor(props: { occurredAt: Date; questionId: string; groupId: string; answerAuthorId: string; text: string }) {
    this.questionId = props.questionId;
    this.groupId = props.groupId;
    this.answerAuthorId = props.answerAuthorId;
    this.text = props.text;
  }
}
