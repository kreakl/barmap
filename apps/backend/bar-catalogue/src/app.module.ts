import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarModule } from './application/bar/bar.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import { AppConfig } from '@catalogue/config';
import { TestModule } from '@catalogue/infrastructure/tests/test.module';
import { BarOutletModule } from '@catalogue/application/bar-outlet/bar-outlet.module';
import { CategoryModule } from '@catalogue/application/category/category.module';

@Module({
  imports: [
    TestModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV == 'development'
          ? '.development.env'
          : '.testing.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService<AppConfig>) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        logger: 'file',
        logging: true,
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    BarModule,
    BarOutletModule,
    CategoryModule,
  ],
})
export class AppModule {}
