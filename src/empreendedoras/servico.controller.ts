import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicoService } from '../empreendedoras/servico.service';
import { CreateServicoDto } from './dtos/create-servico.dto';
import { Servico } from './entities/servicos.entity';
import { UpdateServicoDto } from './dtos/update-servico.dto';

@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Post()
  create(@Body() createServicoDto: CreateServicoDto): Promise<Servico> {
    return this.servicoService.create(createServicoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateServicoDto: UpdateServicoDto) {
    return this.servicoService.update(id, UpdateServicoDto);
  }

  @Get()
  findAll(): Promise<Servico[]> {
    return this.servicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicoService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicoService.delete(id);
  }
}