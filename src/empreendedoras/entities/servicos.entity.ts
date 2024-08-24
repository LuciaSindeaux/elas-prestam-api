import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Empreendedora } from '../entities/empreendedora.entity';

@Entity()
export class Servico {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    descricao: string;

    @ManyToOne(() => Empreendedora, empreendedora => empreendedora.servicosPrestados, { nullable: true })
    Empreendedora: Empreendedora;
}