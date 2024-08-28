import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateServicoDto } from './create-servico.dto';


export class CreateEmpreendedoraDto {
  @IsString()  
  @IsOptional()
  id: string;

  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })   
  nome: string;

  @IsString()
  endereco: string;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsString()
  telefone: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Pelo menos um serviço deve ser informado.' })
  servicosPrestados: CreateServicoDto[];
}
