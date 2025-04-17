import { DbConstants } from "@db/db.constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(DbConstants.TableName.Account)
export class AccountEntity {
	@PrimaryGeneratedColumn("increment", {
		name: DbConstants.ColumnName.Account.id,
	})
	id: number;

	@Column({ name: DbConstants.ColumnName.Account.email })
	email: string;

	@Column({ name: DbConstants.ColumnName.Account.password })
	password: string;

	@Column({ name: DbConstants.ColumnName.Global.createdAt })
	createdAt: Date;

	@Column({ name: DbConstants.ColumnName.Global.updatedAt })
	updatedAt: Date;
}
