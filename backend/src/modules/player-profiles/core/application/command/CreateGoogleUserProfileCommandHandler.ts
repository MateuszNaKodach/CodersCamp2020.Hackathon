import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { CreateGoogleUserProfile } from './CreateGoogleUserProfile';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { createUserProfile } from '../../domain/GoogleUserProfile';
import { GoogleUserProfilesRepository } from '../GoogleUserProfilesRepository';

export class CreateGoogleUserProfileCommandHandler implements CommandHandler<CreateGoogleUserProfile> {
  constructor(private readonly eventPublisher: DomainEventPublisher, private readonly repository: GoogleUserProfilesRepository) {}

  async execute(command: CreateGoogleUserProfile): Promise<CommandResult> {
    const state = createUserProfile(command);

    await this.repository.save(state);
    return CommandResult.success();
  }
}
