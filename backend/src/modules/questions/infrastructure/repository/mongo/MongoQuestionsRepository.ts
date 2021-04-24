import { UserQuestionsRepository } from '../../../core/application/UserQuestionsRepository';
import { UserQuestions } from '../../../core/domain/UserQuestions';
import mongoose, { Schema } from 'mongoose';
import { Question } from '../../../core/domain/Question';

export class MongoQuestionsRepository implements UserQuestionsRepository {
  async save(userQuestions: UserQuestions): Promise<void> {
    await MongoUserQuestions.findByIdAndUpdate(
      { _id: userQuestions.authorId },
      {
        _id: userQuestions.authorId,
        questions: userQuestions.questions.map((question) => ({
          questionId: question.questionId,
          groupId: question.groupId,
          text: question.text,
          authorId: question.authorId,
        })),
      },
      { upsert: true, useFindAndModify: true },
    );
  }

  async findByAuthorId(authorId: string): Promise<UserQuestions | undefined> {
    const mongoFindResult = await MongoUserQuestions.findById(authorId);
    return mongoFindResult ? mongoDocumentToDomain(mongoFindResult) : undefined;
  }
}

type MongoUserQuestions = {
  readonly _id: string;
  readonly questions: {
    questionId: string;
    groupId: string;
    text: string;
    authorId: string;
  }[];
} & mongoose.Document;

const QuestionSchema = new mongoose.Schema({
  questionId: Schema.Types.String,
  groupId: Schema.Types.String,
  text: Schema.Types.String,
  authorId: Schema.Types.String,
});

const UserQuestionsSchema = new mongoose.Schema({
  _id: Schema.Types.String,
  questions: [QuestionSchema],
});

const MongoUserQuestions = mongoose.model<MongoUserQuestions>('UserQuestions', UserQuestionsSchema);

function mongoDocumentToDomain(mongoDocument: MongoUserQuestions): UserQuestions {
  return new UserQuestions({
    authorId: mongoDocument._id,
    questions: [
      ...mongoDocument.questions.map(
        (question) =>
          new Question({
            questionId: question.questionId,
            groupId: question.groupId,
            text: question.text,
            authorId: question.authorId,
          }),
      ),
    ],
  });
}
