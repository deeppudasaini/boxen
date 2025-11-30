import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { EmailsModule } from './emails/emails.module';
import { RagModule } from './rag/rag.module';
import { SummariesModule } from './summaries/summaries.module';
import { InsightsModule } from './insights/insights.module';
import { ClerkAuthMiddleware } from './auth/middleware/clerk-auth.middleware';
import clerkConfig from './config/clerk.config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [clerkConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV === 'development',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    AccountsModule,
    EmailsModule,
    RagModule,
    SummariesModule,
    InsightsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClerkAuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
