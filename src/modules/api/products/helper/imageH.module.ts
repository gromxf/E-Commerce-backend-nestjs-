// image.module.ts
import { Module, Global } from '@nestjs/common';
import { ImageService } from './image.service';
import { CloudinaryModule } from 'src/core/cloudinary/cloudinary.module';

@Global()
@Module({
    imports: [CloudinaryModule], // dacă ImageService depinde de CloudinaryService
    providers: [ImageService],
    exports: [ImageService], // important ca să fie disponibil în alte module
})
export class ImageModule { }
