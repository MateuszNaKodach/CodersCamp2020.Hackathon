import {StartQuiz} from "../application/command/StartQuiz";
import {DomainCommandResult} from "../../../../shared/core/domain/DomainCommandResult";
import {QuizWasStarted} from "./event/QuizWasStarted";

export class GroupQuiz {
  readonly startedAt: Date;
  readonly quizId: string;
  readonly groupId: string;
  readonly question: { questionId: string; text: string };
  readonly answers: { answerId: string; userId: string; text: string }[];

  static fromProps(props: { startedAt: Date, quizId: string, groupId: string, question: { questionId: string; text: string }, answers: { answerId: string; userId: string; text: string }[] }) {
    return new GroupQuiz(
        props.startedAt,
        props.quizId,
        props.groupId,
        props.question,
        props.answers
    )
  }

  constructor(startedAt: Date, quizId: string, groupId: string, question: { questionId: string; text: string }, answers: { answerId: string; userId: string; text: string }[]) {
    this.startedAt = startedAt;
    this.quizId = quizId;
    this.groupId = groupId;
    this.question = question;
    this.answers = answers;
  }

  usersToMatchRandomized(): { userId: string }[] {
    return this.answers.map(a => ({userId: a.userId}))
        .sort((a, b) => 0.5 - Math.random())
  }

  answersToMatchRandomized(): { answerId: string, text: string }[] {
    return this.answers.map(a => ({answerId: a.answerId, text: a.text}))
        .sort((a, b) => 0.5 - Math.random())
  }
}


export function startQuiz(quiz: GroupQuiz | undefined, command: StartQuiz, currentTime: Date): DomainCommandResult<GroupQuiz> {
  if (quiz !== undefined) {
    throw new Error("Quiz already started!")
  }
  const startedQuiz = GroupQuiz.fromProps({...command, startedAt: currentTime});
  const quizWasStarted = QuizWasStarted.event({occurredAt: currentTime, ...command})
  return {
    state: startedQuiz,
    events: [quizWasStarted]
  }
}





