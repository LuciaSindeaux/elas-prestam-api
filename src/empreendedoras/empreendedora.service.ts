import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEmpreendedoraDto } from './dtos/create-empreendedora.dto';
import { UpdateEmpreendedoraDto } from './dtos/update-empreendedora.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empreendedora } from './entities/empreendedora.entity';
import { Servico } from './entities/servicos.entity';


@Injectable()
export class EmpreendedorasService {
  constructor(
     @InjectRepository(Empreendedora)
     private EmpreendedorasRepository: Repository<Empreendedora>,

     @InjectRepository(Servico)
     private servicoRepository: Repository<Servico>,

  ) {}

  async create(createEmpreendedoraDto: CreateEmpreendedoraDto): Promise<Empreendedora> {
    try {
      const { servicosPrestados, ...empreendedoraData } = createEmpreendedoraDto;

      const servicos = await Promise.all(
        servicosPrestados.map(async (CreateServicoDto) => {
          const existingServico = await this.servicoRepository.findOneBy({ descricao: CreateServicoDto.descricao });
          if (existingServico) {
            return existingServico;
          }
          const novoServico = this.servicoRepository.create(CreateServicoDto);
          return await this.servicoRepository.save(novoServico);
        }),
      );

      const novaEmpreendedora = this.EmpreendedorasRepository.create({
        ...empreendedoraData,
        servicosPrestados: servicos,
      });

      return await this.EmpreendedorasRepository.save(novaEmpreendedora);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar a empreendedora. Tente novamente mais tarde.');
    }
  }

  async findAll(): Promise<Empreendedora[]> {
    return this.EmpreendedorasRepository.find({
      relations: ['servicosPrestados'],
    });
  }

  async findOne(id: string): Promise<Empreendedora> {
    return this.EmpreendedorasRepository.findOne({
      where: { id },
      relations: {
        servicosPrestados: true,
      },
    });
  }

  async update(id: string, updateEmpreendedoraDto: UpdateEmpreendedoraDto) {
    return this.EmpreendedorasRepository.update(id, updateEmpreendedoraDto);
  }

  async delete(id: string): Promise<void> {
    const empreendedora = await this.EmpreendedorasRepository.findOne({
      where: { id },
      relations: ['servicosPrestados'], 
    });
  
    if (!empreendedora) {
      throw new InternalServerErrorException('Empreendedora não encontrada.');
    }
  
    if (empreendedora.servicosPrestados.length > 0) {
      await Promise.all(
        empreendedora.servicosPrestados.map(async (servico) => {
          await this.servicoRepository.delete(servico.id);
        }),
      );
    }
  
  
    await this.EmpreendedorasRepository.delete(id);
  }
}
