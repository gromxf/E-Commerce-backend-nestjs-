import { Module, OnModuleInit } from '@nestjs/common';
import { PrismaModule } from './corePrisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { SeederModule } from 'src/modules/seeder/seeder.modules';
import { SeederService } from 'src/modules/seeder/seeder.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ApiModule } from "../modules/api/api.module";
import { ConfigModule } from '@nestjs/config';




@Module({
  //import toate modelele
  imports: [PrismaModule, JwtModule, SeederModule, CloudinaryModule, ApiModule, ConfigModule],
})
export class CoreModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) { }

  async onModuleInit() {
    await this.seederService.seed(); // aici rulezi seed-ul automat
  }
}