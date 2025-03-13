import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TvsService } from './tvs.service';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';
import { FilterTvDto } from './dto/filter-tv.dto';
import { TvType } from './entities/tv.type.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('tvs')
export class TvsController {
  constructor(private readonly tvsService: TvsService) { }

  @Post()
  create(@Body() createTvDto: CreateTvDto) {
    return this.tvsService.create(createTvDto);
  }

  @Post("paginate")
  findAll(@Body() filter: FilterTvDto) {
    return this.tvsService.findAll(filter);
  }

  @Get('tmdb/:id/:type')
  findOneByTMDB(@Param('id') id: string, @Param('type') type: TvType) {
    return this.tvsService.findbyTMDBId(+id, type);
  }

  @Put('pauseAt/:id')
  updatePausedAt(@Param('id') id: string, @Body() updatePausedAt: any) {
    return this.tvsService.updatePausedAt(id, updatePausedAt.pauseAt);
  }

  @Put('status/:id')
  updateStatus(@Param('id') id: string, @Body() updatePausedAt: any) {
    return this.tvsService.updateStatus(id, updatePausedAt.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tvsService.remove(id);
  }

  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.tvsService.createUser(createUserDto);
  }

  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.tvsService.login(loginUserDto);
  }
}
