import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Servico } from "src/empreendedoras/entities/servicos.entity";

@Injectable()
export class ServicosRepository {
    constructor(
        @InjectRepository(Servico)
        private readonly servicoRepository: Repository<Servico>,
    ) {}

    async findAll(): Promise<Servico[]> {
        return await this.servicoRepository.find();
    }

    async create(servico: Servico): Promise<Servico> {
        return await this.servicoRepository.save(servico);
    }

    async delete(id: number): Promise<void> {
        await this.servicoRepository.delete(id);
    }

}
   