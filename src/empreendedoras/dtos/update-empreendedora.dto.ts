import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpreendedoraDto } from './create-empreendedora.dto';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { OneToMany } from 'typeorm';
import { CreateServicoDto } from './create-servico.dto';

export class UpdateEmpreendedoraDto extends PartialType(
  CreateEmpreendedoraDto,
) {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsString()
  endereco?: string;
  
  @IsString()
  cidade?: string;

  @IsString()
  estado?: string;

  @IsString()
  telefone?: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Pelo menos um serviço deve ser informado.' })
  servicosPrestados?: CreateServicoDto[];
}
