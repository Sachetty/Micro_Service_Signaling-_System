import { DataRadar } from './interfaces/dataInfo';
import { Observable } from 'rxjs';
import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'radar',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'radarProducer',
        allowAutoTopicCreation: true
      }
    }
  })

  private client: ClientKafka;
  
  async onModuleInit() {
    const requestPatters = ['radar_micro_service'];

    requestPatters.forEach(async pattern => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Post()
  DataRadar(@Body() data: DataRadar ): Observable<DataRadar> {
    return this.client.send('radar_micro_service', data);
  }
}
