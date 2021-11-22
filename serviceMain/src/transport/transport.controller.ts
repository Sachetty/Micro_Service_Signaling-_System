import { Controller, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { TransportService } from './transport.service';
import { Transport as TransportDto } from './dto/transport';

@Controller('Transport')
export class TransportController implements OnModuleInit{
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'main',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'consumerMain',
        allowAutoTopicCreation: true
      }
    }
  })

  private client: ClientKafka;
  
  async onModuleInit() {
    const requestPatters = ['radar_data_show'];

    requestPatters.forEach(async pattern => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  constructor(private readonly transportService: TransportService){}

  @MessagePattern('radar_micro_service')
  async createRegister(@Payload() register: any): Promise<TransportDto> {
    this.sendToConsumer(register.value);
    return this.transportService.createRegister(register.value);
  }

  sendToConsumer(register: any): Observable<any>{
    return this.client.emit('radar_data_show', register);
  }
}
