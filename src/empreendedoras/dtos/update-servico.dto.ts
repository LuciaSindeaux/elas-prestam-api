import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateServicoDto {
  @IsNotEmpty({ message: 'O nome do serviço é obrigatório.' })
  @IsString({ message: 'O nome do serviço deve ser uma string.' })
  @ApiProperty({ example: 'Manicure', description: 'Nome do serviço prestado' })
  descricao?: string;

  @IsUUID()
  @IsOptional()
  empreendedoraId?: string;
}
