import {
  ChangeUserProfileData,
  ChangeUserProfileDataDTO,
  ChangeUserProfileDataResponseDTO,
} from '@/application/use-cases/change-user-profile-data.usecase';
import {
  CreateUser,
  CreateUserDTO,
  CreateUserResponseDTO,
} from '@/application/use-cases/create-user.usecase';
import { GetUserProfileData } from '@/application/use-cases/get-user-profile-data.usecase';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../misc/auth-guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly getUserProfileData: GetUserProfileData,
    private readonly changeUserProfileData: ChangeUserProfileData,
  ) {}

  @Post('new')
  @HttpCode(201)
  async create(@Body() dto: CreateUserDTO): Promise<CreateUserResponseDTO> {
    const user = await this.createUser.execute(dto);
    return CreateUserResponseDTO.fromEntity(user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getProfileData(@Req() req: AuthenticatedRequest) {
    console.log(req.user);
    const id = req.user.id;
    return this.getUserProfileData.execute({ id });
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async changeProfileData(
    @Req() req: AuthenticatedRequest,
    @Body() dto: ChangeUserProfileDataDTO,
  ) {
    const id = req.user.id;
    const user = await this.changeUserProfileData.execute(id, dto);
    return ChangeUserProfileDataResponseDTO.fromEntity(user);
  }
}
