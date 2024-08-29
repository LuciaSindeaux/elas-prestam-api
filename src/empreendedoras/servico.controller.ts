import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicoService } from '../empreendedoras/servico.service';
import { CreateServicoDto } from './dtos/create-servico.dto';
import { Servico } from './entities/servicos.entity';
import { UpdateServicoDto } from './dtos/update-servico.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('servicos')
@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo serviço' })
  @ApiResponse({ status: 201, description: 'Serviço cadastrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  create(@Body() createServicoDto: CreateServicoDto): Promise<Servico> {
    return this.servicoService.create(createServicoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um serviço' })
  @ApiResponse({ status: 200, description: 'Serviço atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  update(@Param('id') id: string, @Body() UpdateServicoDto: UpdateServicoDto) {
    return this.servicoService.update(id, UpdateServicoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os serviços' })
  @ApiResponse({ status: 200, description: 'Listagem de serviços' })
  @ApiResponse({ status: 404, description: 'Nenhum serviço encontrado' })
  findAll(): Promise<Servico[]> {
    return this.servicoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um serviço pelo ID' })
  @ApiResponse({ status: 200, description: 'Serviço encontrado' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  findOne(@Param('id') id: string) {
    return this.servicoService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um serviço' })
  @ApiResponse({ status: 200, description: 'Serviço removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  remove(@Param('id') id: string) {
    return this.servicoService.delete(id);
  }
}