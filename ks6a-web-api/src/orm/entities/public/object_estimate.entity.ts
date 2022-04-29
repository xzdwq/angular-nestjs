import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";

import { ProjectEntity, EstimateEntity } from '@src/orm';

@Entity({
  synchronize: true,
  schema: 'public',
  name: 'object_estimate',
})
export class ObjectEstimateEntity {
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

  @Column()
  sorting: number;

  @Column({ nullable: true })
  projectId: string;
  @ManyToOne(() => ProjectEntity, (rel) => rel.objectEstimates, { cascade: true })
  @JoinColumn({ name: 'projectId' })
  project: ProjectEntity;

  @OneToMany(() => EstimateEntity, (rel) => rel.objectEstimate)
  estimates: EstimateEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateDate: Date;
}
