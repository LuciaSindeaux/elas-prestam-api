import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servico } from './entities/servicos.entity';
import { CreateServicoDto } from './dtos/create-servico.dto';
import { Empreendedora } from './entities/empreendedora.entity';

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(Servico)
    private servicoRepository: Repository<Servico>,
    @InjectRepository(Empreendedora)
    private EmpreendedorasRepository: Repository<Empreendedora>,
  ) {}

  async create(createServicoDto: CreateServicoDto): Promise<Servico> {
    try {
      const { empreendedoraId, ...servicoData } = createServicoDto;
      const servico = this.servicoRepository.create(servicoData);
  
      if (empreendedoraId) {
        const empreendedora = await this.EmpreendedorasRepository.findOneBy({ id: empreendedoraId });
        servico.Empreendedora = empreendedora;
      }
  
      return await this.servicoRepository.save(servico);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar o serviço. Tente novamente mais tarde.');
    }
  }
 
  async findAll(): Promise<Servico[]> {
    return this.servicoRepository.find();
  }

  async findOne(id: string): Promise<Servico> {
    const servico = await this.servicoRepository.findOne({
      where: { id }, 
    });

    if (!servico) {
      throw new InternalServerErrorException('Serviço não encontrado.');
    }
    return servico;
  }

  async delete(id: string) {
    return this.servicoRepository.delete(id);
  }

  async update(id: string, updateServicoDto: CreateServicoDto) {
    return this.servicoRepository.update(id, updateServicoDto);
  }

}