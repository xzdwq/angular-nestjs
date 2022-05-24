import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BeforeUpdate, OneToMany } from "typeorm";

import { Ks6aItemEntity, Ks6aJournalEntity, ObjectEstimateEntity } from '@src/orm';

@Entity({
  synchronize: true,
  schema: 'ks6a',
  name: 'estimate',
  orderBy: {
    sorting: 'ASC',
  },
})
export class EstimateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid',
    unique: true,
    nullable: false,
  })
  guid: string;

  @Column({ length: 1024 })
  name: string;

  @Column({
    name: 'name_eng',
    length: 1024,
  })
  nameEng: string;

  @Column({
    length: 255,
    unique: true,
    nullable: false,
  })
  code: string;

  @Column({
    name: 'local_estimate_number',
    length: 1024,
    unique: true,
  })
  localEstimateNumber: string;

  @Column()
  sorting: number;

  @Column({
    name: 'object_estimate_id',
    nullable: true,
  })
  objectEstimateId: number;
  @ManyToOne(() => ObjectEstimateEntity, (rel) => rel.estimates, { cascade: true })
  @JoinColumn({ name: 'object_estimate_id' })
  objectEstimate: ObjectEstimateEntity;

  @OneToMany(() => Ks6aJournalEntity, (rel) => rel.estimate)
  journals: Ks6aJournalEntity[];

  @OneToMany(() => Ks6aItemEntity, (rel) => rel.estimate)
  ks6aItem: Ks6aItemEntity[];

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
