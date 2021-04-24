import {QueryHandler} from "../../../../../shared/core/application/query/QueryHandler";
import {
    FindCurrentGroupQuestionByGroupId,
    FindCurrentGroupQuestionByGroupIdResult
} from "./FindCurrentGroupQuestionByGroupId";
import {AskingGroupQuestionRepository} from "../AskingGroupQuestionRepository";

export class FindCurrentGroupQuestionByGroupIdQueryHandler implements QueryHandler<FindCurrentGroupQuestionByGroupId, FindCurrentGroupQuestionByGroupIdResult> {
    constructor(private readonly repository: AskingGroupQuestionRepository) {}

    execute(query: FindCurrentGroupQuestionByGroupId): Promise<FindCurrentGroupQuestionByGroupIdResult> {
        return this.repository.findByGroupId(query.groupId);
    }
}