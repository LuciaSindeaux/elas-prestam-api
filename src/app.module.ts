import { forwardRef, Module } from '@nestjs/common';
import { EmpreendedorasModule } from './empreendedoras/empreendedora.module';
import { Empreendedora } from './empreendedoras/entities/empreendedora.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servico } from './empreendedoras/entities/servicos.entity';
import { ServicosModule } from './empreendedoras/servico.module';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Empreendedora, Servico],
      synchronize: true,
    }),
    forwardRef(() => EmpreendedorasModule),
    forwardRef(() => ServicosModule)
  ],
})
export class AppModule {}