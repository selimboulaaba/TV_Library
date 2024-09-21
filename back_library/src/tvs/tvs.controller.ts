import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TvsService } from './tvs.service';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';
import { FilterTvDto } from './dto/filter-tv.dto';
import { UpdatePausedAt } from './dto/updatePause.dto';

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

  @Get('tmdb/:id/:isMovie')
  findOneByTMDB(@Param('id') id: string, @Param('isMovie') isMovie: boolean) {
    return this.tvsService.findbyTMDBId(+id, isMovie);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tvsService.findOne(+id);
  }

  @Put(':id')
  updatePausedAt(@Param('id') id: string, @Body() updatePausedAt: UpdatePausedAt) {
    return this.tvsService.updatePausedAt(id, updatePausedAt.pauseAt);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTvDto: UpdateTvDto) {
    return this.tvsService.update(+id, updateTvDto);
  }

  @Delete(':id/:password')
  remove(@Param('id') id: string, @Param('password') password: string) {
    return this.tvsService.remove(id);
  }
}
