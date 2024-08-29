import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpreendedoraDto } from './create-empreendedora.dto';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CreateServicoDto } from './create-servico.dto';
import { ApiProperty } from '@nestjs/swagger';  

export class UpdateEmpreendedoraDto extends PartialType(
  CreateEmpreendedoraDto,
) {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Maria da Silva', description: 'Nome da empreendedora' }) 
  nome: string;

  @IsString()
  @ApiProperty({ example: 'Rua Ceara, 123', description: 'Endereço da empreendedora' })
  endereco?: string;
  
  @IsString()
  @ApiProperty({ example: 'Fortaleza', description: 'Cidade onde a empreeendedora presta serviços' })
  cidade?: string;

  @IsString()
  @ApiProperty({ example: 'Ceará', description: 'Estado onde a empreeendedora presta serviços' })
  estado?: string;

  @IsString()
  @ApiProperty({ example: '44123456789', description: 'Telefone para contato' })
  telefone?: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Pelo menos um serviço deve ser informado.' })
  @ApiProperty({ type: [CreateServicoDto], description: 'Lista de serviços prestados pela empreendedora' })
  servicosPrestados?: CreateServicoDto[];
}
