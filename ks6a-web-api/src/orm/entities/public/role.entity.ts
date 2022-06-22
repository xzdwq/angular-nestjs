import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, Generated, OneToMany } from "typeorm";

import { UserRoleEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'public',
  name: 'role',
})
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  guid: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  nameEng: string;

  @Column({ length: 255 })
  code: string;

  @OneToMany(() => UserRoleEntity, (rel) => rel.roles)
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
