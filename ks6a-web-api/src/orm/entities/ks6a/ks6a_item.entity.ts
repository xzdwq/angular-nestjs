import { BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { EstimateEntity, ExecutionEntity, Ks6aJournalEntity, RemainderEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'ks6a',
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
    name: 'unit_measure',
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

  @Column({
    name: 'wbs_code',
    length: 50,
  })
  wbsCode: string;

  @Column({
    name: 'cbs_code_i',
    length: 50,
  })
  cbsCodeI: string;

  @Column({
    name: 'cbs_code_ii',
    length: 50,
  })
  cbsCodeII: string;

  @Column({
    name: 'estimate_id',
    nullable: true,
  })
  estimateId: number;
  @ManyToOne(() => EstimateEntity, (rel) => rel.ks6aItem, { cascade: true })
  @JoinColumn({ name: 'estimate_id' })
  estimate: EstimateEntity;

  @Column({
    name: 'journal_id',
    nullable: true,
  })
  journalId: number;
  @ManyToOne(() => Ks6aJournalEntity, (rel) => rel.journals, { cascade: true, eager: true })
  @JoinColumn({ name: 'journal_id' })
  journal: Ks6aJournalEntity;

  @OneToMany(() => ExecutionEntity, (rel) => rel.ks6aItem, { eager: true })
  execution: ExecutionEntity[];

  @OneToMany(() => RemainderEntity, (rel) => rel.ks6aItem, { eager: true })
  remainder: RemainderEntity[];

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
