import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('hello-world')
  async getHelloWorld() {
    return { result: await this.appService.getHelloWorld() };
  }

  @Post('set-hello-world')
  async setHelloWorld(@Body('text') text: string) {
    return {result : await this.appService.setHelloWorld(text)}
  }
}
