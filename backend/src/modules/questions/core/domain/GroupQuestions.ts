import { Question } from './Question';

export class GroupQuestions {
  readonly groupId: string;
  readonly questionAskedLastly: Question | undefined;
  readonly questionAskedLastlyDate: Date | undefined;
  readonly questionList: Question[];

  constructor(props: {
    groupId: string;
    questionAskedLastly: Question | undefined;
    questionAskedLastlyDate: Date | undefined;
    questionList: Question[];
  }) {
    this.groupId = props.groupId;
    this.questionAskedLastly = props.questionAskedLastly;
    this.questionAskedLastlyDate = props.questionAskedLastlyDate;
    this.questionList = props.questionList;
  }
}
