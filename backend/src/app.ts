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
import { TournamentsRegistrationsModuleCore } from './modules/tournaments-registrations/core/TournamentsRegistrationsModuleCore';
import { CurrentTimeProvider } from './shared/core/CurrentTimeProvider';
import { InMemoryTournamentRegistrationsRepository } from './modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryTournamentRegistrationsRepository';
import { InMemoryPlayers } from './modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryPlayers';
import { TournamentRegistrationsRestApiModule } from './modules/tournaments-registrations/presentation/rest-api/TournamentRegistrationsRestApiModule';
import { Module } from './shared/Module';
import { isDefined } from './common/Defined';
import { ModuleRestApi } from './shared/presentation/rest-api/ModuleRestApi';
import { DomainEventBus } from './shared/core/application/event/DomainEventBus';
import { EntityIdGenerator } from './shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from './shared/infrastructure/core/application/UuidEntityIdGenerator';
import { LoggingDomainEventBus } from './shared/infrastructure/core/application/event/LoggingDomainEventBus';
import { MongoTournamentRegistrationsRepository } from './modules/tournaments-registrations/infrastructure/repository/mongo/MongoTournamentRegistrationsRepository';
import { Express } from 'express';
import { connectToMongoDb } from './shared/infrastructure/repository/connectToMongoDb';
import { connectToPostgreSql } from './shared/infrastructure/repository/connectToPostgreSql';
import { PostgreSqlTournamentRegistrationsRepository } from './modules/tournaments-registrations/infrastructure/repository/postgresql/PostgreSqlTournamentRegistrationsRepository';
import { PlayerProfilesModuleCore } from './modules/player-profiles/core/PlayerProfilesModuleCore';
import { PlayerProfileRestApiModule } from './modules/player-profiles/presentation/rest-api/PlayerProfileRestApiModule';
import { InMemoryPlayerProfileRepository } from './modules/player-profiles/infrastructure/repository/inmemory/InMemoryPlayerProfileRepository';
import { MongoPlayerProfileRepository } from './modules/player-profiles/infrastructure/repository/mongo/MongoPlayerProfileRepository';
import { CreatePlayerProfile } from './modules/player-profiles/core/application/command/CreatePlayerProfile';
import { NodeMailerEmailSender } from './modules/email-sending/infrastructure/mailer/NodeMailerEmailSender';
import { ConsoleEmailSender } from './modules/email-sending/infrastructure/mailer/ConsoleEmailSender';
import { SendEmailModuleCore } from './modules/email-sending/core/SendEmailModuleCore';
import { MongoPlayers } from './modules/tournaments-registrations/infrastructure/repository/mongo/MongoPlayers';
import { RetryCommandBus } from './shared/infrastructure/core/application/command/RetryCommandBus';
import { LoggingCommandBus } from './shared/infrastructure/core/application/command/LoggingCommandBus';
import { TimeModuleCore } from './modules/time/core/TimeModuleCore';
import { GroupQuizModuleCore } from './modules/group-quiz/core/GroupQuizModuleCore';
import { InMemoryGroupQuizRepository } from './modules/group-quiz/infrastructure/InMemoryGroupQuizRepository';
import { GroupQuizRestApiModule } from './modules/group-quiz/presentation/rest-api/GroupQuizRestApiModule';
import { StartQuiz } from './modules/group-quiz/core/application/command/StartQuiz';

config();

export type TableSoccerTournamentsApplication = { restApi: Express };

export async function TableSoccerTournamentsApplication(
  commandBus: CommandBus = new RetryCommandBus(new LoggingCommandBus(new InMemoryCommandBus()), 10),
  eventBus: DomainEventBus = new LoggingDomainEventBus(new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus())),
  queryBus: QueryBus = new InMemoryQueryBus(),
  currentTimeProvider: CurrentTimeProvider = () => new Date(),
  entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator(),
): Promise<TableSoccerTournamentsApplication> {
  if (process.env.MONGO_REPOSITORIES === 'ENABLED') {
    await connectToMongoDb();
  }
  if (process.env.POSTGRES_REPOSITORIES === 'ENABLED') {
    await connectToPostgreSql();
  }

  const tournamentRegistrationsRepository = TournamentRegistrationsRepository();
  const players = TournamentRegistrationsPlayers();
  const tournamentsRegistrationsModule: Module = {
    core: TournamentsRegistrationsModuleCore(eventBus, currentTimeProvider, tournamentRegistrationsRepository, players, players),
    restApi: TournamentRegistrationsRestApiModule(commandBus, eventBus, queryBus),
  };

  const playerProfilesRepository = PlayerProfilesRepository();
  const playerProfilesModule: Module = {
    core: PlayerProfilesModuleCore(eventBus, commandBus, currentTimeProvider, playerProfilesRepository),
    restApi: PlayerProfileRestApiModule(commandBus, eventBus, queryBus),
  };
  const timeModule: Module = {
    core: TimeModuleCore(eventBus, currentTimeProvider),
  };

  const quizModule: Module = {
    core: GroupQuizModuleCore(eventBus, commandBus, currentTimeProvider, new InMemoryGroupQuizRepository()),
    restApi: GroupQuizRestApiModule(commandBus, eventBus, queryBus),
  };

  const sendingEmailModule: Module = EmailModuleCore();

  const modules: Module[] = [
    process.env.TOURNAMENTS_REGISTRATIONS_MODULE === 'ENABLED' ? tournamentsRegistrationsModule : undefined,
    process.env.PLAYER_PROFILES_MODULE === 'ENABLED' ? playerProfilesModule : undefined,
    process.env.EMAILS_SENDING_MODULE === 'ENABLED' ? sendingEmailModule : undefined,
    timeModule,
    quizModule,
  ].filter(isDefined);

  const modulesCores: ModuleCore[] = modules.map((module) => module.core);
  initializeModuleCores(commandBus, eventBus, queryBus, modulesCores);

  const modulesRestApis: ModuleRestApi[] = modules.map((module) => module.restApi).filter(isDefined);
  const restApi = restApiExpressServer(modulesRestApis);

  //await initializeDummyData(commandBus, entityIdGenerator);
  await initializeDummyQuizzes(commandBus, entityIdGenerator);

  return { restApi };
}

async function initializeDummyQuizzes(commandBus: CommandBus, entityIdGenerator: EntityIdGenerator) {
  const classFirstA = 'TeamBackend';
  const createQuiz = StartQuiz.command({
    quizId: entityIdGenerator.generate(),
    groupId: classFirstA,
    question: {
      questionId: entityIdGenerator.generate(),
      text: 'W jakim szkoleniu chciałbyś wziąć udział?',
    },
    answers: [
      {
        answerId: entityIdGenerator.generate(),
        userId: entityIdGenerator.generate(),
        text: 'W szkoleniu z Event Modelingu.',
      },
      {
        answerId: entityIdGenerator.generate(),
        userId: entityIdGenerator.generate(),
        text: 'Dawajcie DDD.',
      },
    ],
  });
  await commandBus.execute(createQuiz);
}

//TODO: Remove for production usage
async function initializeDummyData(commandBus: CommandBus, entityIdGenerator: EntityIdGenerator) {
  const janKowalski = {
    playerId: entityIdGenerator.generate(),
    firstName: 'Jan',
    emailAddress: 'jan.kowalski@test.pl',
    lastName: 'Kowalski',
    phoneNumber: '123123123',
  };
  const katarzynaNowak = {
    playerId: entityIdGenerator.generate(),
    firstName: 'Katarzyna',
    emailAddress: 'kasia12@test.pl',
    lastName: 'Nowak',
    phoneNumber: '231231231',
  };
  const tomekDomek = {
    playerId: entityIdGenerator.generate(),
    firstName: 'Tomek',
    emailAddress: 'tomek.domek@test.pl',
    lastName: 'Domek',
    phoneNumber: '543543543',
  };
  const franekPoranek = {
    playerId: entityIdGenerator.generate(),
    firstName: 'Franek',
    emailAddress: 'franek.ranek@test.pl',
    lastName: 'Ranek',
    phoneNumber: '999444999',
  };
  const janKowalski2 = {
    playerId: entityIdGenerator.generate(),
    firstName: 'Jan',
    emailAddress: 'jan.kowalski2@test.pl',
    lastName: 'Kowalski2',
    phoneNumber: '133455444',
  };
  const katarzynaNowak2 = {
    playerId: entityIdGenerator.generate(),
    firstName: 'Katarzyna',
    emailAddress: 'kasia123@test.pl',
    lastName: 'Nowak2',
    phoneNumber: '123432544',
  };
  const tomekDomek2 = {
    playerId: entityIdGenerator.generate(),
    firstName: 'Tomek',
    emailAddress: 'tomek.domek2@test.pl',
    lastName: 'Domek2',
    phoneNumber: '999412333',
  };
  const franekPoranek2 = {
    playerId: entityIdGenerator.generate(),
    firstName: 'Franek',
    emailAddress: 'franek.ranek2@test.pl',
    lastName: 'Ranek2',
    phoneNumber: '444444444',
  };

  await commandBus.execute(new CreatePlayerProfile({ ...janKowalski }));
  await commandBus.execute(new CreatePlayerProfile({ ...katarzynaNowak }));
  await commandBus.execute(new CreatePlayerProfile({ ...tomekDomek }));
  await commandBus.execute(new CreatePlayerProfile({ ...franekPoranek }));
  await commandBus.execute(new CreatePlayerProfile({ ...janKowalski2 }));
  await commandBus.execute(new CreatePlayerProfile({ ...katarzynaNowak2 }));
  await commandBus.execute(new CreatePlayerProfile({ ...tomekDomek2 }));
  await commandBus.execute(new CreatePlayerProfile({ ...franekPoranek2 }));
}

function TournamentRegistrationsRepository() {
  if (process.env.MONGO_REPOSITORIES === 'ENABLED' && process.env.TOURNAMENTS_REGISTRATIONS_DATABASE === 'MONGO') {
    return new MongoTournamentRegistrationsRepository();
  }
  if (process.env.POSTGRES_REPOSITORIES === 'ENABLED' && process.env.TOURNAMENTS_REGISTRATIONS_DATABASE === 'POSTGRES') {
    return new PostgreSqlTournamentRegistrationsRepository();
  }
  return new InMemoryTournamentRegistrationsRepository();
}

function TournamentRegistrationsPlayers() {
  if (process.env.MONGO_REPOSITORIES === 'ENABLED' && process.env.TOURNAMENTS_REGISTRATIONS_DATABASE === 'MONGO') {
    return new MongoPlayers();
  }
  return new InMemoryPlayers();
}

function PlayerProfilesRepository() {
  if (process.env.MONGO_REPOSITORIES === 'ENABLED' && process.env.PLAYER_PROFILES_DATABASE === 'MONGO') {
    return new MongoPlayerProfileRepository();
  }
  return new InMemoryPlayerProfileRepository();
}

function EmailModuleCore() {
  if (process.env.EMAIL_SENDER === 'CONSOLE') {
    return {
      core: SendEmailModuleCore(new ConsoleEmailSender('Console <console@console.com>')),
    };
  }
  return {
    core: SendEmailModuleCore(
      new NodeMailerEmailSender({
        host: 'smtp.gmail.com',
        port: 465,
        from: 'TourDeFoos <TourDeFoos@gmail.com>',
        secure: true,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      }),
    ),
  };
}
