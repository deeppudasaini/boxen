import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';

@Injectable()
export class ClerkAuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ClerkAuthMiddleware.name);

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (token) {
        // Verify the token using Clerk SDK
        // In v5, verifyToken is part of the client
        const decodedToken = await clerkClient.verifyToken(token);
        
        // Attach the user/session info to the request
        (req as any).user = decodedToken;
      }
    } catch (error) {
      this.logger.error('Error verifying Clerk token', error);
      // We don't throw here, we just don't attach the user. 
      // The Guard will handle the 401 if authentication is required.
    }

    next();
  }
}
