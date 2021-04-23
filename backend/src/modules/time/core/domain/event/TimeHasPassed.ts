import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class TimeHasPassed implements DomainEvent {
  /**
   * Current time
   */
  readonly occurredAt: Date;

  /**
   * When you will be notified about next time passed
   */
  readonly nextEventAt: Date;

  constructor(occurredAt: Date, nextEventAt: Date) {
    this.occurredAt = occurredAt;
    this.nextEventAt = nextEventAt;
  }
}
