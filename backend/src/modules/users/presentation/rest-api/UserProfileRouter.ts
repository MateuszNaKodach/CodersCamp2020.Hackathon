import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PostUserProfileRequestBody } from './request/PostUserProfileRequestBody';
import {
  FindUserProfileByEmail,
  FindUserProfileByEmailResult,
} from '../../core/application/query/FindUserProfileByEmail';
import { StatusCodes } from 'http-status-codes';
import { CreateUserProfile } from '../../core/application/command/CreateUserProfile';

export function userProfileRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const signIn = async (request: Request, response: Response) => {
    const { email, password } = request.params;
    const queryResult = await queryPublisher.execute<FindUserProfileByEmailResult>(new FindUserProfileByEmail({ email: email }));
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: `User with email = ${email} not found!` });
    }

    const isPasswordCorrect = await bcrypt.compare(password, queryResult.password);
    if (!isPasswordCorrect) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: `Wrong password!` });
    }

    const token = jwt.sign({ email: queryResult.email, userId: queryResult.userId }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' });
    return response.status(StatusCodes.OK).json({ user: queryResult, token: token });
  };

  const signUp = async (request: Request, response: Response) => {
    const requestBody: PostUserProfileRequestBody = request.body;
    const queryResult = await queryPublisher.execute<FindUserProfileByEmailResult>(new FindUserProfileByEmail({
      email: requestBody.email,
    }));
    if (queryResult) {
      return response.status(StatusCodes.BAD_REQUEST).json({ message: `User with email = ${requestBody.email} already exists!` });
    }
    if (requestBody.email !== requestBody.emailConfirmation) {
      return response.status(StatusCodes.BAD_REQUEST).json({ message: `Emails don't match!` });
    }
    if (requestBody.password !== requestBody.passwordConfirmation) {
      return response.status(StatusCodes.BAD_REQUEST).json({ message: `Passwords don't match!` });
    }

    const hashedPassword = await bcrypt.hash(requestBody.password, 12);
    const commandResult = await commandPublisher.execute(new CreateUserProfile({
      userId: requestBody.userId,
      displayName: `${requestBody.name} ${requestBody.surname}`,
      email: requestBody.email,
      password: hashedPassword
    }));
    const token = jwt.sign({ email: requestBody.email, userId: requestBody.userId }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' });

    return commandResult.process(
      () => response.status(StatusCodes.CREATED).json({requestBody, token}).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message })
    );
  };

  const router = express.Router();
  router.post('/signIn', signIn);
  router.post('/signUp', signUp);

  return router;
}