import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services";
import { BasicLoginRequest } from "../dto";
import { ApiResponseDto } from "@utils";
import { SkipAuth } from "../skip-auth.decorator";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	@SkipAuth()
	async basicLogin(@Body() dto: BasicLoginRequest) {
		const data = await this.authService.basicLogin(dto);
		return new ApiResponseDto(data, null, "Success!");
	}
}
