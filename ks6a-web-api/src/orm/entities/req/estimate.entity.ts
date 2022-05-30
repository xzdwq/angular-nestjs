import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BeforeUpdate, OneToMany } from "typeorm";

import { Ks6aItemEntity, Ks6aEntity, ObjectEstimateEntity } from '@src/orm';

@Entity({
  synchronize: true,
  schema: 'req',
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

  @Column({ length: 1024 })
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
  objectEstimateId: number;
  @ManyToOne(() => ObjectEstimateEntity, (rel) => rel.estimates, { cascade: true })
  @JoinColumn()
  objectEstimate: ObjectEstimateEntity;

  @OneToMany(() => Ks6aEntity, (rel) => rel.estimate)
  ks6as: Ks6aEntity[];

  @OneToMany(() => Ks6aItemEntity, (rel) => rel.estimate)
  ks6aItems: Ks6aItemEntity[];

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
