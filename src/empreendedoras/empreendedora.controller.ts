import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmpreendedorasService } from './empreendedora.service';
import { CreateEmpreendedoraDto } from './dtos/create-empreendedora.dto';
import { UpdateEmpreendedoraDto } from './dtos/update-empreendedora.dto';

@Controller('empreendedoras')
export class EmpreendedorasController {
  constructor(private readonly empreendedorasService: EmpreendedorasService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createEmpreendedoraDto: CreateEmpreendedoraDto) {
    return this.empreendedorasService.create(createEmpreendedoraDto);
  }

  @Get()
  findAll() {
    return this.empreendedorasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empreendedorasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpreendedoraDto: UpdateEmpreendedoraDto) {
    return this.empreendedorasService.update(id, updateEmpreendedoraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empreendedorasService.delete(id);
  }
}
