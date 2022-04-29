import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { ObjectEstimateEntity } from '@src/orm';

@Entity({
  synchronize: true,
  schema: 'public',
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
    length: 1024,
    unique: true,
  })
  localEstimateNumber: string;

  @Column()
  sorting: number;

  @Column({ nullable: true })
  objectEstimateId: string;
  @ManyToOne(() => ObjectEstimateEntity, (rel) => rel.estimates, { cascade: true })
  @JoinColumn({ name: 'objectEstimateId' })
  objectEstimate: ObjectEstimateEntity;

  @CreateDateColumn({
    name: 'create_timestamp',
    type: 'timestamp'
  })
  createDate: Date;

  @UpdateDateColumn({
    name: 'update_timestamp',
    type: 'timestamp'
  })
  updateDate: Date;
}
