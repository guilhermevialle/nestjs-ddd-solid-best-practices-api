import {
  ChangePadContent,
  ChangePadContentDTO,
} from '@/application/use-cases/change-pad-content.usecase';
import {
  CreatePad,
  CreatePadDTO,
} from '@/application/use-cases/create-pad.usecase';
import {
  GetPadData,
  GetPadDataDTO,
} from '@/application/use-cases/get-pad-data.usecase';
import { Pad } from '@/domain/pad.entity';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
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

export class GetPadDataResponseDTO {
  static fromEntity(pad: Pad): GetPadDataResponseDTO {
    return {
      id: pad.id,
      content: pad.content,
      expiresIn: pad.expiresIn,
      createdAt: pad.createdAt,
      endAt: pad.endAt,
    };
  }
}

export class ChangePadContentResponseDTO {
  static fromEntity(pad: Pad): ChangePadContentResponseDTO {
    return {
      id: pad.id,
      content: pad.content,
      expiresIn: pad.expiresIn,
      createdAt: pad.createdAt,
      endAt: pad.endAt,
    };
  }
}

@Controller('pads')
export class PadController {
  constructor(
    private readonly createPad: CreatePad,
    private readonly getPadData: GetPadData,
    private readonly changePadContent: ChangePadContent,
  ) {}

  @Patch(':id')
  @HttpCode(204)
  async changeContent(
    @Param('id') id: string,
    @Body() dto: ChangePadContentDTO,
  ): Promise<ChangePadContentResponseDTO> {
    const pad = await this.changePadContent.execute(id, dto);

    return ChangePadContentResponseDTO.fromEntity(pad);
  }

  @Get(':id')
  @HttpCode(200)
  async get(@Param() dto: GetPadDataDTO): Promise<GetPadDataResponseDTO> {
    const pad = await this.getPadData.execute(dto);

    return GetPadDataResponseDTO.fromEntity(pad);
  }

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
