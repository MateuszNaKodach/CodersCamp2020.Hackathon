import { UserProfile } from '../../domain/UserProfile';

export class FindUserProfileById {
  readonly userId: string;

  constructor(props: { userId: string }) {
    this.userId = props.userId;
  }
}

export type FindUserProfileByIdResult = UserProfile | undefined;
