import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, BeforeUpdate } from "typeorm";

import { ProjectEntity, EstimateEntity } from '@src/orm';

@Entity({
  synchronize: true,
  schema: 'ks6a',
  name: 'object_estimate',
  orderBy: {
    sorting: 'ASC',
  },
})
export class ObjectEstimateEntity {
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

  @Column()
  sorting: number;

  @Column({
    name: 'project_id',
    nullable: true,
  })
  projectId: number;
  @ManyToOne(() => ProjectEntity, (rel) => rel.objectEstimates, { cascade: true })
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @OneToMany(() => EstimateEntity, (rel) => rel.objectEstimate)
  estimates: EstimateEntity[];

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
