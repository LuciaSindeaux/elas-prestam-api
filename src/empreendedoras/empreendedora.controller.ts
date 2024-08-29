import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmpreendedorasService } from './empreendedora.service';
import { CreateEmpreendedoraDto } from './dtos/create-empreendedora.dto';
import { UpdateEmpreendedoraDto } from './dtos/update-empreendedora.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('empreendedoras')
@Controller('empreendedoras')
export class EmpreendedorasController {
  constructor(private readonly empreendedorasService: EmpreendedorasService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar uma nova empreendedora' })
  @ApiResponse({ status: 201, description: 'Empreendedora cadastrada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createEmpreendedoraDto: CreateEmpreendedoraDto) {
    return this.empreendedorasService.create(createEmpreendedoraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as empreendedoras' })
  @ApiResponse({ status: 200, description: 'Listagem de empreendedoras' })
  @ApiResponse({ status: 404, description: 'Nenhuma empreendedora encontrada' })
  findAll() {
    return this.empreendedorasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma empreendedora pelo ID' })
  @ApiResponse({ status: 200, description: 'Empreendedora encontrada' })
  @ApiResponse({ status: 404, description: 'Empreendedora não encontrada' })
  findOne(@Param('id') id: string) {
    return this.empreendedorasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma empreendedora' })
  @ApiResponse({ status: 200, description: 'Empreendedora atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  update(@Param('id') id: string, @Body() updateEmpreendedoraDto: UpdateEmpreendedoraDto) {
    return this.empreendedorasService.update(id, updateEmpreendedoraDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma empreendedora' })
  @ApiResponse({ status: 200, description: 'Empreendedora removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Empreendedora não encontrada' })
  remove(@Param('id') id: string) {
    return this.empreendedorasService.delete(id);
  }
}
