import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class TimeHasPassed implements DomainEvent {
  /**
   * Current time
   */
  readonly occurredAt: Date;

  constructor(occurredAt: Date) {
    this.occurredAt = occurredAt;
  }
}
