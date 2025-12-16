import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres', 
    password: 'admin',
    database: 'meubanco',
    autoLoadEntities: true,
    synchronize: false,
    logging: true,
    }),
     UsersModule,
     AuthModule,
    ],
})
export class AppModule {}