import { GoogleUserProfile } from '../../domain/GoogleUserProfile';

export class FindGoogleUserProfileById {
  readonly userId: string;

  constructor(props: { userId: string }) {
    this.userId = props.userId;
  }
}

export type FindUserProfileByIdResult = GoogleUserProfile | undefined;
