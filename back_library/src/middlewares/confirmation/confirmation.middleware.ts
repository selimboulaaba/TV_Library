import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ConfirmationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    if (password === process.env.CONFIRMATION_PASSWORD) {
      next();
    } else {
      return res.status(200).json({
        success: false,
        message: 'Confirmation Required!',
      });
    }
  }
}
