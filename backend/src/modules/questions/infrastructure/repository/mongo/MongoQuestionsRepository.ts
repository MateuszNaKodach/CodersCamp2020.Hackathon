import { QuestionsRepository } from '../../../core/application/QuestionsRepository';
import { UserQuestions } from '../../../core/domain/UserQuestions';
import { TournamentId } from '../../../core/domain/TournamentId';
import mongoose, { Schema } from 'mongoose';
import { RegistrationsStatus } from '../../../core/domain/RegistrationsStatus';
import { PlayerId } from '../../../../../shared/core/domain/PlayerId';

export class MongoQuestionsRepository implements QuestionsRepository {
  async save(registrations: UserQuestions): Promise<void> {
    await MongoTournamentRegistrations.findOneAndUpdate(
      { _id: registrations.tournamentId.raw, __v: registrations.version },
      {
        _id: registrations.tournamentId.raw,
        __v: registrations.version + 1,
        status: registrations.status,
        registeredPlayers: registrations.registeredPlayers.map((playerId) => playerId.raw),
      },
      { upsert: true, useFindAndModify: true },
    );
  }

  async findAll(): Promise<UserQuestions[]> {
    const mongoFindResult = await MongoTournamentRegistrations.find();
    return mongoFindResult.map((mongoDocument) => mongoDocumentToDomain(mongoDocument));
  }
}

type MongoTournamentRegistrations = {
  readonly _id: string;
  readonly __v: number;
  readonly status: RegistrationsStatus;
  readonly registeredPlayers: string[];
} & mongoose.Document;

const TournamentRegistrationsSchema = new mongoose.Schema({
  _id: Schema.Types.String,
  __v: Schema.Types.Number,
  status: {
    type: Schema.Types.String,
    required: true,
    minlength: 4,
    maxlength: 16,
    unique: false,
  },
  registeredPlayers: {
    type: [Schema.Types.String],
    required: true,
    unique: false,
  },
});

const MongoTournamentRegistrations = mongoose.model<MongoTournamentRegistrations>('TournamentRegistrations', TournamentRegistrationsSchema);

function mongoDocumentToDomain(mongoDocument: MongoTournamentRegistrations): UserQuestions {
  return new UserQuestions({
    tournamentId: TournamentId.from(mongoDocument._id),
    version: mongoDocument.__v,
    status: mongoDocument.status,
    registeredPlayers: [...mongoDocument.registeredPlayers.map((playerId) => PlayerId.from(playerId))],
  });
}
