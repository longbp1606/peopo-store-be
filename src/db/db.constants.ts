export const DbConstants = {
	TableName: {
		Account: "account",
		Profile: "profile",
	},
	ColumnName: {
		Global: {
			createdAt: "created_at",
			updatedAt: "updated_at",
			isDeleted: "is_deleted",
		},
		Account: {
			id: "id",
			email: "email",
			password: "password",
		},
		Profile: {
			id: "id",
			accountId: "account_id",
			name: "name",
			phoneNumber: "phone_number",
			avatar: "avatar",
		},
	},
} as const;
