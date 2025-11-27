import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClerkAuthMiddleware } from './auth/middleware/clerk-auth.middleware';
import clerkConfig from './config/clerk.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [clerkConfig],
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClerkAuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
