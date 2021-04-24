import * as express from "express"

export namespace Express {
  interface Request {
    authenticatedUser?: { userId: string }
  }
}
