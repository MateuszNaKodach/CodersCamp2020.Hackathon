import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class QuizWasStarted implements DomainEvent {
  readonly occurredAt: Date;
  readonly quizId: string;
  readonly groupId: string;
  readonly question: { questionId: string; text: string };
  readonly answers: { answerId: string; userId: string; text: string }[];

  static event(props: {
    occurredAt: Date;
    quizId: string;
    groupId: string;
    question: { questionId: string; text: string };
    answers: { answerId: string; userId: string; text: string }[];
  }): QuizWasStarted {
    return new QuizWasStarted(props.occurredAt, props.quizId, props.groupId, props.question, props.answers);
  }

  private constructor(
    occurredAt: Date,
    quizId: string,
    groupId: string,
    question: { questionId: string; text: string },
    answers: { answerId: string; userId: string; text: string }[],
  ) {
    this.occurredAt = occurredAt;
    this.quizId = quizId;
    this.groupId = groupId;
    this.question = question;
    this.answers = answers;
  }
}
