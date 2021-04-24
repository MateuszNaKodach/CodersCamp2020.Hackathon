import { UserScore } from '../../domain/UserScore';

export class FindScoresByUserId {
  readonly userId: string;

  constructor(props: { userId: string }) {
    this.userId = props.userId;
  }
}

export type FindScoresByUserIdResult = UserScore | undefined;
