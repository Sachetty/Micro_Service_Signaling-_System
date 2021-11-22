import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';
import { TransportSchema } from './schemas/transport.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transport', schema: TransportSchema}]),
  ],
  controllers: [TransportController],
  providers: [TransportService],
})
export class TransportModule {}
