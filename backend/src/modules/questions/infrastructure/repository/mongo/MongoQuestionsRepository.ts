import { UserQuestionsRepository } from '../../../core/application/UserQuestionsRepository';
import { UserQuestions } from '../../../core/domain/UserQuestions';
import mongoose, { Schema } from 'mongoose';

export class MongoQuestionsRepository implements UserQuestionsRepository {
  async save(userQuestions: UserQuestions): Promise<void> {
    await MongoTournamentRegistrations.findOneAndUpdate(
      { _id: userQuestions.questionId },
      {
        _id: userQuestions.questionId,
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
} & mongoose.Document;

const TournamentRegistrationsSchema = new mongoose.Schema({
  _id: Schema.Types.String,
});

const MongoTournamentRegistrations = mongoose.model<MongoTournamentRegistrations>('TournamentRegistrations', TournamentRegistrationsSchema);

function mongoDocumentToDomain(mongoDocument: MongoTournamentRegistrations): UserQuestions {
  return new UserQuestions({
    questionId: mongoDocument._id,
  });
}
