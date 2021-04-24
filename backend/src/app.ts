import { config } from 'dotenv';
import { restApiExpressServer } from './shared/infrastructure/rest-api/Server';
import { CommandBus } from './shared/core/application/command/CommandBus';
import { InMemoryCommandBus } from './shared/infrastructure/core/application/command/InMemoryCommandBus';
import { StoreAndForwardDomainEventBus } from './shared/infrastructure/core/application/event/StoreAndForwardDomainEventBus';
import { InMemoryDomainEventBus } from './shared/infrastructure/core/application/event/InMemoryDomainEventBus';
import { QueryBus } from './shared/core/application/query/QueryBus';
import { InMemoryQueryBus } from './shared/infrastructure/core/application/query/InMemoryQueryBus';
import { initializeModuleCores } from './shared/core/InitializeModuleCores';
import { ModuleCore } from './shared/core/ModuleCore';
import { CurrentTimeProvider } from './shared/core/CurrentTimeProvider';
import { Module } from './shared/Module';
import { isDefined } from './common/Defined';
import { ModuleRestApi } from './shared/presentation/rest-api/ModuleRestApi';
import { DomainEventBus } from './shared/core/application/event/DomainEventBus';
import { EntityIdGenerator } from './shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from './shared/infrastructure/core/application/UuidEntityIdGenerator';
import { LoggingDomainEventBus } from './shared/infrastructure/core/application/event/LoggingDomainEventBus';
import { Express } from 'express';
import { connectToMongoDb } from './shared/infrastructure/repository/connectToMongoDb';
import { RetryCommandBus } from './shared/infrastructure/core/application/command/RetryCommandBus';
import { LoggingCommandBus } from './shared/infrastructure/core/application/command/LoggingCommandBus';
import { AnswerGroupQuestionModuleCore } from './modules/group-question-answer/core/AnswerGroupQuestionModuleCore';
import { GroupQuestionAnswerRestApiModule } from './modules/group-question-answer/presentation/rest-api/GroupQuestionAnswerRestApiModule';
import { TimeModuleCore } from './modules/time/core/TimeModuleCore';
import { GroupQuizModuleCore } from './modules/quizzes/core/GroupQuizModuleCore';
import { InMemoryGroupQuizRepository } from './modules/quizzes/infrastructure/InMemoryGroupQuizRepository';
import { GroupQuizRestApiModule } from './modules/quizzes/presentation/rest-api/GroupQuizRestApiModule';
import { StartQuiz } from './modules/quizzes/core/application/command/StartQuiz';
import { InMemoryQuizSolutionsRepository } from './modules/quizzes/infrastructure/InMemoryQuizSolutionsRepository';
import { GroupsRestApiModule } from './modules/groups/presentation/rest-api/GroupsRestApiModule';
import { QuestionsModuleCore } from './modules/questions/core/QuestionsModuleCore';
import { MongoQuestionsRepository } from './modules/questions/infrastructure/repository/mongo/MongoQuestionsRepository';
import { InMemoryQuestionsRepository } from './modules/questions/infrastructure/repository/inmemory/InMemoryQuestionsRepository';
import { QuestionsRestApiModule } from './modules/questions/presentation/rest-api/QuestionsRestApiModule';
import { AskingGroupQuestionRestApiModule } from './modules/asking-question/presentation/rest-api/AskingGroupQuestionRestApiModule';
import { AskingGroupQuestionModuleCore } from './modules/asking-question/core/AskingGroupQuestionModuleCore';
import { InMemoryAskingGroupQuestionRepository } from './modules/asking-question/infrastructure/repository/inmemory/InMemoryAskingGroupQuestionRepository';
import { InMemoryGroupQuestionsRepository } from './modules/questions/infrastructure/repository/inmemory/InMemoryGroupQuestionsRepository';
import { InMemoryAnswerGroupQuestionRepository } from './modules/group-question-answer/infrastructure/repository/inmemory/InMemoryAnswerGroupQuestionRepository';

config();

export type TableSoccerTournamentsApplication = { restApi: Express };

export async function IntegramicApplication(
  commandBus: CommandBus = new RetryCommandBus(new LoggingCommandBus(new InMemoryCommandBus()), 10),
  eventBus: DomainEventBus = new LoggingDomainEventBus(new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus())),
  queryBus: QueryBus = new InMemoryQueryBus(),
  currentTimeProvider: CurrentTimeProvider = () => new Date(),
  entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator(),
): Promise<TableSoccerTournamentsApplication> {
  if (process.env.MONGO_REPOSITORIES === 'ENABLED') {
    await connectToMongoDb();
  }

  const answerGroupQuestionRepository = AnswerGroupQuestionRepository();
  const groupQuestionAnswerModule: Module = {
    core: AnswerGroupQuestionModuleCore(eventBus, currentTimeProvider, answerGroupQuestionRepository),
    restApi: GroupQuestionAnswerRestApiModule(commandBus, eventBus, queryBus),
  };

  const askingGroupQuestionModule: Module = {
    core: AskingGroupQuestionModuleCore(eventBus, commandBus, currentTimeProvider, new InMemoryAskingGroupQuestionRepository()),
    restApi: AskingGroupQuestionRestApiModule(commandBus, eventBus, queryBus),
  };

  const questionsRepository = QuestionsRepository();
  const groupQuestionsRepository = GroupQuestionsRepository();
  const questionsModule: Module = {
    core: QuestionsModuleCore(eventBus, commandBus, currentTimeProvider, groupQuestionsRepository, questionsRepository),
    restApi: QuestionsRestApiModule(commandBus, eventBus, queryBus),
  };

  const timeModule: Module = {
    core: TimeModuleCore(eventBus, currentTimeProvider),
  };

  const quizModule: Module = {
    core: GroupQuizModuleCore(
      eventBus,
      commandBus,
      currentTimeProvider,
      new InMemoryGroupQuizRepository(),
      new InMemoryQuizSolutionsRepository(),
    ),
    restApi: GroupQuizRestApiModule(commandBus, eventBus, queryBus),
  };

  const modules: Module[] = [
    process.env.GROUP_QUESTION_ANSWER_MODULE === 'ENABLED' ? groupQuestionAnswerModule : undefined,
    process.env.QUESTIONS_MODULE === 'ENABLED' ? questionsModule : undefined,
    process.env.ASKING_GROUP_QUESTION_MODULE === 'ENABLED' ? askingGroupQuestionModule : undefined,
    timeModule,
    quizModule,
  ].filter(isDefined);

  const modulesCores: ModuleCore[] = modules.map((module) => module.core);
  initializeModuleCores(commandBus, eventBus, queryBus, modulesCores);

  const modulesRestApis: ModuleRestApi[] = modules.map((module) => module.restApi).filter(isDefined);
  const restApi = restApiExpressServer([...modulesRestApis, GroupsRestApiModule(commandBus, eventBus, queryBus)]);

  //await initializeDummyData(commandBus, entityIdGenerator);
  await initializeDummyQuizzes(commandBus, entityIdGenerator);

  return { restApi };
}

async function initializeDummyQuizzes(commandBus: CommandBus, entityIdGenerator: EntityIdGenerator) {
  const classFirstA = 'TeamBackend';
  const createQuiz1 = StartQuiz.command({
    quizId: 'Quiz1',
    groupId: classFirstA,
    question: {
      questionId: 'Quiz1_Question',
      text: 'W jakim szkoleniu chciałbyś wziąć udział?',
    },
    answers: [
      {
        answerId: 'Quiz1_Answer1',
        userId: 'User1',
        text: 'W szkoleniu z Event Modelingu.',
      },
      {
        answerId: 'Quiz1_Answer2',
        userId: 'User2',
        text: 'Dawajcie DDD.',
      },
    ],
  });
  const createQuiz2 = StartQuiz.command({
    quizId: 'Quiz2',
    groupId: classFirstA,
    question: {
      questionId: 'Quiz2_Question',
      text: 'W jakim szkoleniu chciałbyś wziąć udział?',
    },
    answers: [
      {
        answerId: 'Quiz2_Answer1',
        userId: 'User1',
        text: 'W szkoleniu z Event Modelingu.',
      },
      {
        answerId: 'Quiz2_Answer2',
        userId: 'User2',
        text: 'Dawajcie DDD.',
      },
    ],
  });
  await commandBus.execute(createQuiz1);
  await commandBus.execute(createQuiz2);
}

function QuestionsRepository() {
  if (process.env.MONGO_REPOSITORIES === 'ENABLED' && process.env.QUESTIONS_DATABASE === 'MONGO') {
    return new MongoQuestionsRepository();
  }
  return new InMemoryQuestionsRepository();
}

function GroupQuestionsRepository() {
  return new InMemoryGroupQuestionsRepository();
}

function AnswerGroupQuestionRepository() {
  return new InMemoryAnswerGroupQuestionRepository();
}
