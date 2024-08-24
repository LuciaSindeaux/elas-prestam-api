import { forwardRef, Module } from '@nestjs/common';
import { EmpreendedorasService } from './empreendedora.service';
import { EmpreendedorasController } from './empreendedora.controller';
import { Empreendedora } from './entities/empreendedora.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicosModule } from './servico.module';

@Module({
  imports: [TypeOrmModule.forFeature([Empreendedora]),
  ServicosModule,
],
  controllers: [EmpreendedorasController],
  providers: [EmpreendedorasService],
  exports: [TypeOrmModule],
})
export class EmpreendedorasModule {}
