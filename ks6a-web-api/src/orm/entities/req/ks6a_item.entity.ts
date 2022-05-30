import { BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { EstimateEntity, ExecutionEntity, Ks6aEntity, RemainderEntity, Ks6aItemContractorEntity, TotalEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'req',
  name: 'ks6a_item',
})
export class Ks6aItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid',
    unique: true,
    nullable: false,
  })
  guid: string;

  @Column()
  number: number;

  @Column({
    length: 100,
    comment: 'Номер единичной расценки',
  })
  code: string;

  @Column({
    length: 50,
    comment: 'Единица измерения',
  })
  unitMeasure: string;

  @Column({
    type: 'decimal',
    comment: 'Количество работ по смете',
  })
  volume: number;

  @Column({
    type: 'decimal',
    comment: 'Цена за единицу, руб.',
  })
  price: number;

  @Column({
    type: 'decimal',
    comment: 'Сметная (договорная) стоимость, руб.',
  })
  cost: number;

  @Column({ length: 1024 })
  section: string;

  @Column({
    length: 1024,
    comment: 'Конструктивные виды и элементы работ',
  })
  name: string;

  @Column({ length: 50 })
  kks: string;

  @Column({ length: 50 })
  wbsCode: string;

  @Column({ length: 50 })
  cbsCodeI: string;

  @Column({ length: 50 })
  cbsCodeII: string;

  @Column({ nullable: true })
  estimateId: number;
  @ManyToOne(() => EstimateEntity, (rel) => rel.ks6aItems, { cascade: true })
  @JoinColumn()
  estimate: EstimateEntity;

  @Column({ nullable: true })
  ks6aId: number;
  @ManyToOne(() => Ks6aEntity, (rel) => rel.ks6as, { cascade: true, eager: true })
  @JoinColumn()
  ks6a: Ks6aEntity;

  @OneToMany(() => ExecutionEntity, (rel) => rel.ks6aItem, { eager: true })
  executions: ExecutionEntity[];

  @OneToMany(() => RemainderEntity, (rel) => rel.ks6aItem, { eager: true })
  remainders: RemainderEntity[];

  @OneToMany(() => Ks6aItemContractorEntity, (rel) => rel.ks6aItem, { eager: true })
  ks6aItemContractors: Ks6aItemContractorEntity[];

  @Column({ nullable: true })
  totalId: number;
  @OneToOne(() => TotalEntity, (rel) => rel.ks6aItem, { eager: true })
  @JoinColumn()
  total: TotalEntity;

  @CreateDateColumn({
    name: 'create_timestamp',
    type: 'timestamp',
  })
  createDate: Date;

  @UpdateDateColumn({
    name: 'update_timestamp',
    type: 'timestamp',
  })
  updateDate: Date;

  @BeforeUpdate()
  updateTimestamp (): void {
    this.updateDate = new Date;
  }
}
