import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, OneToMany, Generated } from "typeorm";

import { UserRoleEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'public',
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  guid: string;

  @Column({ length: 1024 })
  name: string;

  @OneToMany(() => UserRoleEntity, (rel) => rel.users, { onDelete: 'CASCADE' })
  userRole: UserRoleEntity[];

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
