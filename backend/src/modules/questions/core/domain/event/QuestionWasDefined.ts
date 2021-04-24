import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class QuestionWasDefined implements DomainEvent {
  readonly occurredAt: Date;
  readonly questionId: string;
  readonly groupId: string;
  readonly text: string;
  readonly authorId: string;

  constructor(props: { occurredAt: Date; questionId: string; groupId: string; text: string; authorId: string }) {
    this.occurredAt = props.occurredAt;
    this.questionId = props.questionId;
    this.groupId = props.groupId;
    this.text = props.text;
    this.authorId = props.authorId;
  }
}
