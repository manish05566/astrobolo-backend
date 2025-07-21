import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  UseGuards,
  Put,
  Delete
} from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import {
  CreateConfigurationDto,
  CustomConfigurationDto,
  UpdateDto,
  UpdatePermissionDto
} from './dto/configuration.dto';
//import { HeadersGuard } from '@xapads/nest/modules';

@Controller('config')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) { }

  @Post('')
  async create(
    @Body() body: CreateConfigurationDto
  ) {
    return await this.configurationService.create(body);
  }

  // @Put('')
  // async update(
  //   @Body() body: UpdateDto
  // ) {
  //   return await this.configurationService.update(body);
  // }

  // @Delete('/:id')
  // async distroy(@Param('id') id,) {
  //   return await this.configurationService.distroy(id);
  // }

  // @Post('config-permission')
  // @UseGuards(HeadersGuard)
  // async customConfigurationDto(
  //   @Body() body: CustomConfigurationDto
  // ) {
  //   return await this.configurationService.createCustomConfiguration(body);
  // }

  // @Put('/update-permission')
  // async updatePermission(
  //   @Body() body: UpdatePermissionDto) {
  //   return await this.configurationService.updatePermission(body);
  // }

  // @Get('/:id?')
  // @UseGuards(HeadersGuard)
  // async listing(@Param('id') id, @Req() req: Request) {
  //   return await this.configurationService.listing(id, req);
  // }
}
