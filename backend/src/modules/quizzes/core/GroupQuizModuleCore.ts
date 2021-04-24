import {DomainEventPublisher} from '../../../shared/core/application/event/DomainEventBus';
import {CommandPublisher} from '../../../shared/core/application/command/CommandBus';
import {CurrentTimeProvider} from '../../../shared/core/CurrentTimeProvider';
import {GroupQuizRepository} from './application/GroupQuizRepository';
import {ModuleCore} from '../../../shared/core/ModuleCore';
import {StartQuiz} from './application/command/StartQuiz';
import {StartQuizCommandHandler} from './application/command/StartQuizCommandHandler';
import {FindCurrentQuizByGroupId} from './application/query/FindCurrentQuizByGroupId';
import {FindCurrentQuizByGroupIdQueryHandler} from './application/query/FindCurrentQuizByGroupIdQueryHandler';
import {ResolveQuiz} from './application/command/ResolveQuiz';
import {ResolveQuizCommandHandler} from './application/command/ResolveQuizCommandHandler';
import {QuizSolutionsRepository} from './application/QuizSolutionsRepository';
import {FindQuizSolutions} from './application/query/FindQuizSolutions';
import {FindQuizSolutionsQueryHandler} from './application/query/FindQuizSolutionsQueryHandler';
import {FindQuizById} from "./application/query/FindQuizById";

export function GroupQuizModuleCore(
    eventPublisher: DomainEventPublisher,
    commandPublisher: CommandPublisher,
    currentTimeProvider: CurrentTimeProvider,
    groupQuizRepository: GroupQuizRepository,
    quizSolutionsRepository: QuizSolutionsRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: StartQuiz,
        handler: new StartQuizCommandHandler(eventPublisher, currentTimeProvider, groupQuizRepository),
      },
      {
        commandType: ResolveQuiz,
        handler: new ResolveQuizCommandHandler(eventPublisher, currentTimeProvider, quizSolutionsRepository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [
      {
        queryType: FindCurrentQuizByGroupId,
        handler: new FindCurrentQuizByGroupIdQueryHandler(groupQuizRepository),
      },
      {
        queryType: FindQuizSolutions,
        handler: new FindQuizSolutionsQueryHandler(quizSolutionsRepository),
      },
      {
        queryType: FindQuizById,
        handler: new FindCurrentQuizByGroupIdQueryHandler(groupQuizRepository)
      }
    ],
  };
}
