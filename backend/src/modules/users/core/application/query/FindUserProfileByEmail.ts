import { UserProfile } from '../../domain/UserProfile';

export class FindUserProfileByEmail {
  readonly email: string;

  constructor(props: { email: string }) {
    this.email = props.email;
  }
}

export type FindUserProfileByEmailResult = UserProfile | undefined;