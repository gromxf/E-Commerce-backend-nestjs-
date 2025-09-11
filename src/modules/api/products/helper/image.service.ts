import { Injectable } from "@nestjs/common";
import { CloudinaryService } from "src/core/cloudinary/cloudinary.service";

@Injectable()
export class ImageService {
    constructor(
        private readonly cloudinary: CloudinaryService,
    ) { }
    async processImages(images: string[]): Promise<string[]> {
        const urls: string[] = [];
        for (const img of images) {
            if (img.startsWith('http://') || img.startsWith('https://')) {
                urls.push(img);
            } else {
                urls.push(await this.cloudinary.uploadDataUrl(img));
            }
        }
        return urls;
    }

}        