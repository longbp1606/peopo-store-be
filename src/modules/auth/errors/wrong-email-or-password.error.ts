import { ApiError } from "@errors";

export class WrongEmailOrPasswordError extends ApiError {
	constructor() {
		super({
			code: "wrong_email_or_password",
			message: "Wrong email or password",
			detail: null,
		});
	}
}
