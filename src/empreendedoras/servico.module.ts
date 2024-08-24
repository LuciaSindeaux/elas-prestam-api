import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servico } from './entities/servicos.entity';
import { ServicoController } from './servico.controller';
import { ServicoService } from './servico.service';
import { EmpreendedorasModule } from './empreendedora.module';


@Module({
  imports: [TypeOrmModule.forFeature([Servico]),
  forwardRef(() => EmpreendedorasModule)
],
  controllers: [ServicoController],
  providers: [ServicoService],
  exports: [TypeOrmModule],
})
export class ServicosModule {}
