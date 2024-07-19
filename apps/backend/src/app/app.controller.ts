import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  // @Get('hello-world')
  // async getHelloWorld() {
  //   return { result: await this.appService.getHelloWorld() };
  // }

  // @Post('set-hello-world')
  // async setHelloWorld(@Body('text') text: string) {
  //   return {result : await this.appService.setHelloWorld(text)}
  // }

  @Get('address')
  async getAddress() {
    return {result: await this.appService.getAddress()}
  }

  @Get('game-is-open')
  async getGameIsOpen() {
    return {result : await this.appService.getGameIsOpen()}
  }

  @Post('start-game')
  async startGame(@Body('itemName') itemName: string, @Body('actualPrice') actualPrice : number, @Body('secret') secret: string, @Body('endTime') endTime: number) {
    return {result: await this.appService.startGame(itemName, actualPrice, secret, endTime)}
  }

  @Post('request-tokens')
  async requestTokens(@Body('address') address: `0x${string}`) {
    return {result: await this.appService.requestFaucetTokens(address)}
  }

  @Post('close-game')
  async closeGame(@Body('itemName') itemName: string, @Body('actualPrice') actualPrice: number, @Body('secret') secret: string) {
    return {result: await this.appService.closeGame(itemName, actualPrice, secret)}
  }

  @Post('enter-contest-old')
  async enterContestOld(@Body('guess') bet: number, @Body('address') address: `0x${string}`, @Body('client') client) {
    console.log(bet, address);
    return {result: await this.appService.enterContestOLD(bet, address, client)}
  }

  @Post('enter-contest')
  async enterContest() {

  }

  @Get('fund-faucet')
  async fundFaucet() {
    return {result: await this.appService.fundFaucet()}
  }

}
