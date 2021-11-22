import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
 
  getHello(): void {
    console.log('Hello world');
  }

  @MessagePattern('radar_data_show')
  async showRegister(@Payload() data: any) {
    console.log(data.value);
  }
}
