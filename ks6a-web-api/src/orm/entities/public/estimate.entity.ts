import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { ObjectEstimateEntity } from '@src/orm';

@Entity({
  synchronize: true,
  schema: 'public',
  name: 'estimate',
})
export class EstimateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
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

  @CreateDateColumn({ type: 'timestamptz' })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateDate: Date;
}
