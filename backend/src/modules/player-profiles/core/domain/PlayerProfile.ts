import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { CurrentTimeProvider } from '../../../../shared/core/CurrentTimeProvider';

export class PlayerProfile {
  readonly playerId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly emailAddress: string;

  constructor(props: { playerId: string; firstName: string; lastName: string; emailAddress: string; phoneNumber: string }) {
    this.playerId = props.playerId;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.emailAddress = props.emailAddress;
    this.phoneNumber = props.phoneNumber;
  }
}

export function createPlayerProfile(
  state: PlayerProfile | undefined,
  command: {
    playerId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
  },
  currentTimeProvider: CurrentTimeProvider,
): DomainCommandResult<PlayerProfile> {
  if (state) {
    throw new Error('Such player already exists!');
  }

  const newPlayerProfile = new PlayerProfile({
    playerId: command.playerId,
    firstName: command.firstName,
    lastName: command.lastName,
    //TODO write new type for emailAddress (perfectly if it will be unique, but it will be hard to code)
    emailAddress: command.emailAddress,
    //TODO write type for phoneNumber (perfectly if unique, but what if there will be abroad numbers?)
    phoneNumber: command.phoneNumber,
  });

  return {
    state: newPlayerProfile,
    events: [],
  };
}
