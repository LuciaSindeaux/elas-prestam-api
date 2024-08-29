import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateServicoDto } from './create-servico.dto';
import { ApiProperty } from '@nestjs/swagger';


export class CreateEmpreendedoraDto {
  @IsString()  
  @IsOptional()
  
  id: string;

  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @ApiProperty({ example: 'Maria da Silva', description: 'Nome da empreendedora' })   
  nome: string;

  @IsString()
  @ApiProperty({ example: 'Rua Ceara, 123', description: 'Endereço da empreendedora' })
  endereco: string;

  @IsString()
  @ApiProperty({ example: 'Fortaleza', description: 'Cidade onde a empreeendedora presta serviços' })
  cidade: string;

  @IsString()
  @ApiProperty({ example: 'Ceará', description: 'Estado onde a empreeendedora presta serviços' })
  estado: string;

  @IsString()
  @ApiProperty({ example: '44123456789', description: 'Telefone para contato' })
  telefone: string;

  @IsArray()
  @ApiProperty({ type: [CreateServicoDto], description: 'Lista de serviços prestados pela empreendedora' })
  @ArrayMinSize(1, { message: 'Pelo menos um serviço deve ser informado.' })
  servicosPrestados: CreateServicoDto[];
}
