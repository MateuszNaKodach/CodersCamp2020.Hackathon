import {QuestionAnswer} from "./domain/QuestionAnswer";

export interface AnswerGroupQuestionRepository {
    save(answeredGroupQuestion: QuestionAnswer): Promise<void>;

    findByGroupId(groupId: string): Promise<QuestionAnswer | undefined>;

    findAllByQuestionId(questionId: string): Promise<QuestionAnswer[]>
}
