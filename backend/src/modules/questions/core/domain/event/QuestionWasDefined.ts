import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class QuestionWasDefined implements DomainEvent {
  readonly occurredAt: Date;

  constructor(props: { occurredAt: Date; }) {
    this.occurredAt = props.occurredAt;
  }
}
