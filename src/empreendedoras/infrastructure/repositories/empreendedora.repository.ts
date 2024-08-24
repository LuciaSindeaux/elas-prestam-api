import { InjectRepository } from "@nestjs/typeorm";
import { Empreendedora } from "../../entities/empreendedora.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class EmpreendedorasRepository {
  constructor(
    @InjectRepository(Empreendedora)
    private readonly EmpreendedorasRepository: Repository<Empreendedora>,
  ) {}

  async findAll(): Promise<Empreendedora[]> {
    return await this.EmpreendedorasRepository.find();
  }

  async save(empreendedora: Empreendedora): Promise<Empreendedora> {
    return await this.EmpreendedorasRepository.save(empreendedora);
}
}