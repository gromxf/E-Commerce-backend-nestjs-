import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    async uploadDataUrl(dataUrl: string, options?: UploadApiOptions): Promise<string> {
        const defaultFolder = process.env.CLOUDINARY_FOLDER;
        const uploadOptions: UploadApiOptions = {
            folder: defaultFolder,
            resource_type: 'image',
            ...options,
        };

        const base64Data = this.extractBase64Data(dataUrl);
        const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
        const buffer = Buffer.from(base64Data, 'base64');
        if (buffer.length > MAX_SIZE_BYTES) {
            throw new Error('Image exceeds 5MB limit');
        }

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error: unknown, result: UploadApiResponse | undefined) => {
                if (error || !result) {
                    return reject(error);
                }
                return resolve(result.secure_url);
            });

            uploadStream.end(buffer);
        });
    }

    private extractBase64Data(dataUrl: string): string {
        const commaIndex = dataUrl.indexOf(',');
        if (commaIndex === -1) {
            throw new Error('Invalid data URL format');
        }
        return dataUrl.substring(commaIndex + 1);
    }
}


