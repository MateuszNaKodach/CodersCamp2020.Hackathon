import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';

export class UserScore {
  readonly userId: string;
  readonly score: number;

  constructor(props: { userId: string; score: number }) {
    this.userId = props.userId;
    this.score = props.score;
  }
}

export function sumUserScores(state: UserScore | undefined, command: { userId: string; score: number }): DomainCommandResult<UserScore> {
  const userId = command.userId;
  const score = command.score;
  const userScore = new UserScore({ userId, score: state ? state.score + score : score });
  return {
    state: userScore,
    events: [],
  };
}
