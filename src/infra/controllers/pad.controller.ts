import {
  CreatePad,
  CreatePadDTO,
} from '@/application/use-cases/create-pad.usecase';
import { Pad } from '@/domain/pad.entity';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OptionalJwtAuthGuard } from '../misc/optional-auth-guard';

export class CreatePadResponseDTO {
  static fromEntity(pad: Pad): CreatePadResponseDTO {
    return {
      id: pad.id,
      content: pad.content,
      expiresIn: pad.expiresIn,
      createdAt: pad.createdAt,
      endAt: pad.endAt,
    };
  }
}

@Controller('pad')
export class PadController {
  constructor(private readonly createPad: CreatePad) {}

  @Post('new')
  @HttpCode(201)
  @UseGuards(OptionalJwtAuthGuard)
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreatePadDTO,
  ): Promise<CreatePadResponseDTO> {
    const userId: string | null = req.user?.id ?? null;

    const pad = await this.createPad.execute(userId, dto);

    return CreatePadResponseDTO.fromEntity(pad);
  }
}
