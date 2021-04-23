import {GroupQuestion} from "../../domain/GroupQuestion";

export class FindCurrentGroupQuestion {
    readonly groupId: string;

    constructor(props: { groupId: string }) {
        this.groupId = props.groupId;
    }
}

export type FindCurrentGroupQuestionResult = GroupQuestion | undefined;