export class UserScoresDto {
  readonly userId: string;
  readonly score: number;

  constructor(props: { userId: string; score: number }) {
    this.userId = props.userId;
    this.score = props.score;
  }
}
