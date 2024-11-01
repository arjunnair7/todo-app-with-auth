import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req:RequestWithUser){
        return req.user
       
    }

    @Post('register')
    register(@Body() authPayloadDto:AuthPayloadDto){
        return this.authService.register(authPayloadDto)
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req:RequestWithUser){
        console.log('Inside status method')
        console.log(req.user)
        return req.user
    }

}
