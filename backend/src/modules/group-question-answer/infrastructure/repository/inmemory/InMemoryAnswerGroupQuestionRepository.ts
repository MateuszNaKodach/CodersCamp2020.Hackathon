import {AnswerGroupQuestionRepository} from "../../../core/application/AnswerGroupQuestionRepository";
import {QuestionAnswer} from "../../../core/application/domain/QuestionAnswer";

export class InMemoryAnswerGroupQuestionRepository implements AnswerGroupQuestionRepository {
    private readonly entities: { [id: string]: QuestionAnswer } = {};

    findByGroupId(groupId: string): Promise<QuestionAnswer | undefined> {
        return Promise.resolve(this.entities[groupId]);
    }

    async save(question: QuestionAnswer): Promise<void> {
        this.entities[question.questionId] = question;
    }

    findAllByQuestionId(questionId: string): Promise<QuestionAnswer[]> {
        return Promise.resolve(Object.keys(this.entities)
            .filter((id) => this.entities[id].groupId === questionId)
            .map((id) => this.entities[id]),
        );
    }
}