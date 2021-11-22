import { Transport } from './dto/transport';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TransportService {
  constructor(@InjectModel('Transport') private readonly transportModel: Model<Transport>){}

  async createRegister(register: Transport) {
    return await new this.transportModel(register).save();
  }
}
