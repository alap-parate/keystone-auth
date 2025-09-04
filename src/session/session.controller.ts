import { Controller, Get, Post, Param, HttpStatus, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { SessionService } from './session.service';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SessionListResponseDto } from './dto/session-list-response.dto';

@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({
    type: SessionListResponseDto,
    isArray: true,
  })
  async list(@Param('userId', new ParseUUIDPipe()) userId: string): Promise<SessionListResponseDto[]> {
    return await this.sessionService.list({userId});
  }

  @ApiBearerAuth()
  @ApiNoContentResponse()
  @Post('/revoke')
  @HttpCode(HttpStatus.NO_CONTENT)
  async revoke(@Param('id') id: string): Promise<void> {
    return await this.sessionService.revoke({ id });
  }

  @ApiBearerAuth()
  @ApiNoContentResponse()
  @Post('revoke-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  async revokeAll(@Param('userId', new ParseUUIDPipe()) userId: string): Promise<void> {
    return await this.sessionService.revokeAll({userId});
  }
}
