import { Injectable } from '@nestjs/common';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tv } from './entities/tv.entity';
import { FilterTvDto } from './dto/filter-tv.dto';

@Injectable()
export class TvsService {
  constructor(@InjectModel('Tv') private readonly tvModel: Model<Tv>) { }

  async create(createTvDto: CreateTvDto) {
    try {
      const show = await this.findbyTMDBId(createTvDto.tmdbId, createTvDto.isMovie)
      if (show) {
        throw { success: false, message: "Show Already Exists!" }
      } else {
        const createdTv = await new this.tvModel(createTvDto).save();
        return { success: true, show: createdTv };
      }
    } catch (error) {
      return error;
    }
  }

  async findbyTMDBId(tmdbId: number, isMovie: boolean) {
    try {
      return await this.tvModel.findOne({ tmdbId, isMovie })
    } catch (error) {
      return error;
    }
  }

  async findAll(filter: FilterTvDto) {
    try {
      const result = { shows: [], total_pages: 0 }
      if (filter.type === 'All') {
        result.shows = await this.tvModel.find();
        result.total_pages = (await this.tvModel.find().countDocuments()) / 20;
      } else {
        result.shows = await this.tvModel.find({ isMovie: filter.type === "Movies" ? true : false });
        result.total_pages = (await this.tvModel.find({ isMovie: filter.type === "Movies" ? true : false }).countDocuments()) / 20;
      }
      result.total_pages = Math.floor(result.total_pages)

      return result
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} tv`;
  }

  update(id: number, updateTvDto: UpdateTvDto) {
    return `This action updates a #${id} tv`;
  }

  remove(id: number) {
    return `This action removes a #${id} tv`;
  }
}
