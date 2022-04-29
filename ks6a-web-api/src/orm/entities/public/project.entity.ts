import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

import { ObjectEstimateEntity } from '@src/orm';

@Entity({
  synchronize: true,
  schema: 'public',
  name: 'project',
})
export class ProjectEntity {
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

  @OneToMany(() => ObjectEstimateEntity, (rel) => rel.project)
  objectEstimates: ObjectEstimateEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateDate: Date;
}
