import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, Generated, ManyToOne, JoinColumn } from "typeorm";

import { UserEntity, RoleEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'public',
  name: 'user_role',
})
export class UserRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  guid: string;

  @Column({ nullable: false })
  userId: number;
  @ManyToOne(() => UserEntity, (rel) => rel.userRole, { cascade: true })
  @JoinColumn()
  users: UserEntity;

  @Column({ nullable: false })
  roleId: number;
  @ManyToOne(() => RoleEntity, (rel) => rel.userRole, { cascade: true })
  @JoinColumn()
  roles: RoleEntity;

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
