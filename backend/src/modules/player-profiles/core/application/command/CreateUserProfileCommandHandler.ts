import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { CreateUserProfile } from './CreateUserProfile';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { createUserProfile } from '../../domain/UserProfile';
import { UserProfilesRepository } from '../UserProfilesRepository';

export class CreateUserProfileCommandHandler implements CommandHandler<CreateUserProfile> {
  constructor(private readonly eventPublisher: DomainEventPublisher, private readonly repository: UserProfilesRepository) {}

  async execute(command: CreateUserProfile): Promise<CommandResult> {
    const state = createUserProfile(command);

    await this.repository.save(state);
    return CommandResult.success();
  }
}
