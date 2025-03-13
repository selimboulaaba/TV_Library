import { Injectable } from '@nestjs/common';
import { CreateTvDto } from './dto/create-tv.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tv } from './entities/tv.entity';
import { FilterTvDto } from './dto/filter-tv.dto';
import { TvStatus } from './entities/tv.status.enum';
import { TvType } from './entities/tv.type.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class TvsService {
  constructor(@InjectModel('Tv') private readonly tvModel: Model<Tv>, @InjectModel('User') private readonly userModel: Model<User>) { }

  async create(createTvDto: CreateTvDto) {
    try {
      const show = await this.findbyTMDBId(createTvDto.tmdbId, createTvDto.type)
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

  async findbyTMDBId(tmdbId: number, type: TvType) {
    try {
      return await this.tvModel.findOne({ tmdbId, type })
    } catch (error) {
      return error;
    }
  }

  async findAll(filter: FilterTvDto) {
    try {
      const result = { shows: [], total_pages: 0 }

      const query: any = {};
      query.title = { $regex: filter.title, $options: 'i' };
      
      if (filter.status) {
        query.status = filter.status;
      }
      if (filter.type) {
        query.type = filter.type;
      }
      if (filter.userId) {
        query.userId = filter.userId;
      }

      result.shows = await this.tvModel
        .find(query)
        .sort({ _id: -1 })
        .skip(24 * (filter.page - 1))
        .limit(24);
      result.total_pages = (await this.tvModel.find(query).countDocuments()) / 24;

      result.total_pages = Math.floor(result.total_pages + 1)

      return result
    } catch (error) {
      return error;
    }
  }

  async updatePausedAt(id: string, pauseAt: string) {
    try {
      const show = await this.tvModel.findByIdAndUpdate(id, { pauseAt })
      if (show) {
        return { success: true, show };
      } else {
        return { success: false, message: 'Show not Found!' };
      }
    } catch (error) {
      return error;
    }
  }

  async updateStatus(id: string, status: TvStatus) {
    try {
      const show = await this.tvModel.findByIdAndUpdate(id, { status })
      if (show) {
        return { success: true, show };
      } else {
        return { success: false, message: 'Show not Found!' };
      }
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const show = await this.tvModel.findByIdAndDelete(id)
      if (show) {
        return { success: true };
      } else {
        return { success: false, message: 'Show not Found!' };
      }
    } catch (error) {
      return error;
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
        const createdTv = await new this.userModel(createUserDto).save();
        return { success: true };
    } catch (error) {
      return error;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userModel.findOne({ username: loginUserDto.username });
      if (!user) {
        return { success: false, message: 'Wrong Credentials!' };
      }
      if (user.password !== loginUserDto.password) {
        return { success: false, message: 'Wrong Credentials!' };
      }
      return { success: true, data: user };
    } catch (error) {
      return { error: error.message };
    }
  }
}
