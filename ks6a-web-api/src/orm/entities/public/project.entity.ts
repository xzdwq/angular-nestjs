import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

import { ObjectEstimateEntity } from '@src/orm';

@Entity({
  synchronize: true,
  schema: 'public',
  name: 'project',
  orderBy: {
    sorting: 'ASC',
  },
})
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid',
    unique: true,
    nullable: false,
  })
  guid: string;

  @Column({ length: 255 })
  name: string;

  @Column({
    name: 'name_en',
    length: 255,
  })
  nameEn: string;

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
