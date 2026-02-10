import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER, 
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: false,
    logging: true,
    }),
     UsersModule,
     AuthModule,
     ProjectModule,
     TaskModule,
    ],
    providers:[{
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})

export class AppModule {}