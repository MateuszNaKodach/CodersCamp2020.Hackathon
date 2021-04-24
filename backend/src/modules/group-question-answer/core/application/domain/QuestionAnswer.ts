import {CurrentTimeProvider} from "../../../../../shared/core/CurrentTimeProvider";
import {DomainCommandResult} from "../../../../../shared/core/domain/DomainCommandResult";
import {GroupQuestionWasAnswered} from "./event/GroupQuestionWasAnswered";

export class QuestionAnswer {
    readonly questionId: string;
    readonly groupId: string;
    readonly answerAuthorId: string;
    readonly text: string;

    constructor(props: { questionId: string; groupId: string; answerAuthorId: string; text: string }) {
        this.questionId = props.questionId;
        this.groupId = props.groupId;
        this.answerAuthorId = props.answerAuthorId;
        this.text = props.text;
    }
}

export function answerGroupQuestion(
    command: { questionId: string, groupId: string, answerAuthorId: string, text: string },
    currentTimeProvider: CurrentTimeProvider,
): DomainCommandResult<QuestionAnswer> {
    if (command.text.trim().length <= 0) {
        throw new Error('An answer cannot be empty!');
    }

    const groupQuestionWasAnswered = new GroupQuestionWasAnswered({
        occurredAt: currentTimeProvider(), ...command }

    );

    const questionAnswer = new QuestionAnswer( {...command });

    return {
        state: questionAnswer,
        events: [groupQuestionWasAnswered],
    }
}
