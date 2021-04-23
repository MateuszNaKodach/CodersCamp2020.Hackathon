export class GroupQuestionWasAsked {
    readonly occurredAt: Date;
    readonly questionId: string;
    readonly groupId: string;
    readonly askedBy: string;
    readonly text: string;

    constructor(props: { occurredAt: Date, questionId: string, groupId: string, askedBy: string, text: string }) {
        this.occurredAt = props.occurredAt;
        this.questionId = props.questionId;
        this.groupId = props.groupId;
        this.askedBy = props.askedBy;
        this.text = props.text;
    }
}