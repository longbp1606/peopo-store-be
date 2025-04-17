import { AccountRepository } from "@db/repository/account.repository";
import { Injectable } from "@nestjs/common";
import { ClassTracing } from "magic-otel";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Env } from "@utils";
import { BasicLoginRequest } from "../dto";
import { InvalidTokenError, WrongEmailOrPasswordError } from "../errors";

@Injectable()
@ClassTracing()
export class AuthService {
	constructor(private readonly accountRepository: AccountRepository) {}

	async issueTokenPair(accountId: number) {
		const accessToken = jwt.sign({}, Env.JWT_AT_SECRET, {
			subject: accountId.toString(),
			expiresIn: Env.JWT_AT_EXPIRES_IN,
		});
		const refreshToken = jwt.sign({}, Env.JWT_RT_SECRET, {
			subject: accountId.toString(),
			expiresIn: Env.JWT_RT_EXPIRES_IN,
		});
		return {
			accessToken,
			refreshToken,
		};
	}

	async basicLogin(dto: BasicLoginRequest) {
		const account = await this.accountRepository.findOneBy({
			email: dto.email,
		});
		if (!account) {
			throw new WrongEmailOrPasswordError();
		}
		const compare = await bcrypt.compare(dto.password, account.password);
		if (!compare) {
			throw new WrongEmailOrPasswordError();
		}
		return this.issueTokenPair(account.id);
	}

	async refreshToken(token: string) {
		const decoded = jwt.verify(token, Env.JWT_RT_SECRET);
		if (typeof decoded !== "object" || !decoded.sub) {
			throw new Error("Invalid token");
		}
		const accountId = parseInt(decoded.sub);
		return this.issueTokenPair(accountId);
	}

	async verifyAccessToken(accessToken: string) {
		const decoded = jwt.verify(accessToken, Env.JWT_AT_SECRET);
		if (typeof decoded !== "object" || !decoded.sub) {
			throw new InvalidTokenError();
		}
		const accountId = parseInt(decoded.sub);
		const account = await this.accountRepository.findOneBy({
			id: accountId,
		});
		if (!account) {
			throw new InvalidTokenError();
		}
		return account;
	}
}
