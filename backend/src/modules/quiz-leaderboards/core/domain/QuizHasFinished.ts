import {DomainEvent} from "../../../../shared/domain/event/DomainEvent";

export class QuizHasFinished implements DomainEvent {
  readonly occurredAt: Date;
  readonly quizId: string;

  constructor(occurredAt: Date, quizId: string) {
    this.occurredAt = occurredAt;
    this.quizId = quizId;
  }
}
