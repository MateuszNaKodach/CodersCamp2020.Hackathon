import { Question } from '../../../core/domain/Question';

export class UserQuestionsDto {
  readonly authorId: string;
  readonly questions: Question[];

  constructor(props: { authorId: string; questions: Question[] }) {
    this.authorId = props.authorId;
    this.questions = props.questions;
  }
}
