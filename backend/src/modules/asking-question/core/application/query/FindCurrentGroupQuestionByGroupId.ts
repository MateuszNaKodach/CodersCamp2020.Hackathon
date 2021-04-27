import { GroupQuestions } from '../../../../questions/core/domain/GroupQuestions';

export class FindCurrentGroupQuestionByGroupId {
  readonly groupId: string;

  constructor(props: { groupId: string }) {
    this.groupId = props.groupId;
  }
}

export type FindCurrentGroupQuestionByGroupIdResult = GroupQuestions | undefined;
