import { UserQuestions } from '../../domain/UserQuestions';

export class FindQuestionsByAuthorId {
  readonly authorId: string;

  constructor(props: { authorId: string }) {
    this.authorId = props.authorId;
  }
}

export type FindQuestionsByAuthorIdResult = UserQuestions | undefined;
