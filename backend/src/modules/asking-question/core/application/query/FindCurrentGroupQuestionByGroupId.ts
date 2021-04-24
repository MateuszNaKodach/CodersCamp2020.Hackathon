import { GroupQuestion } from '../../domain/GroupQuestion';

export class FindCurrentGroupQuestionByGroupId {
  readonly groupId: string;

  constructor(props: { groupId: string }) {
    this.groupId = props.groupId;
  }
}

export type FindCurrentGroupQuestionByGroupIdResult = GroupQuestion | undefined;
