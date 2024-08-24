import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Servico } from "./servicos.entity";
import e from "express";

@Entity()
export class Empreendedora {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome:string;

    @Column()
    endereco:string;

    @Column()
    cidade:string;

    @Column()
    telefone:string;

    @OneToMany(() => Servico, (servico) => servico.Empreendedora, {eager: true})
    @JoinColumn()
  servicosPrestados: Servico[];
}
