import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';

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
    ],
})
export class AppModule {}