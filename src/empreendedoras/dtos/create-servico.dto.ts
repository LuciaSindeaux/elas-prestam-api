import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateServicoDto {
  @IsNotEmpty({ message: 'O nome do serviço é obrigatório.' })
  @IsString({ message: 'O nome do serviço deve ser uma string.' })
  descricao?: string;

  @IsUUID()
  @IsOptional()
  empreendedoraId?: string;
}
