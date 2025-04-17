import { ApiProperty } from "@nestjs/swagger";

export class BasicLoginRequest {
	@ApiProperty({ example: "peopostore@gmail.com" })
	email: string;

	@ApiProperty({ example: "Peopo@123" })
	password: string;
}
