import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { CreateUserProfile } from './CreateUserProfile';
import { UserProfileRepository } from '../UserProfileRepository';
import { createUserProfile } from '../../domain/UserProfile';

export class CreateUserProfileCommandHandler implements CommandHandler<CreateUserProfile> {
  constructor(private readonly eventPublisher: DomainEventPublisher, private readonly repository: UserProfileRepository) {}

  async execute(command: CreateUserProfile): Promise<CommandResult> {
    const state = createUserProfile(command);

    await this.repository.save(state);
    return CommandResult.success();
  }
}
