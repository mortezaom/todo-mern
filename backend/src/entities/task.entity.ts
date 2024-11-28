import {
	Entity,
	Column,
	ManyToOne,
	ManyToMany,
	JoinTable,
	PrimaryGeneratedColumn,
	JoinColumn,
	Index,
} from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

@Entity("tasks")
export class TaskEntity extends CoreEntity {
	@PrimaryGeneratedColumn("uuid")
	uuid: string;

	@Column()
	title: string;

	@Column({ nullable: true })
	description: string;

	@Column({ default: false, name: "is_completed" })
	isCompleted: boolean;

	@Column({ default: 0 })
	order: number;

	@ManyToOne(
		() => UserEntity,
		(user) => user.tasks,
	)
	@JoinColumn({ name: "user_id" })
	user: UserEntity;
}
