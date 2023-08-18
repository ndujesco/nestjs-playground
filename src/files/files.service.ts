import { BadRequestException, Injectable } from '@nestjs/common';
import FileUploadService from 'src/file_upload/file_upload.interface';

@Injectable()
export class FilesService {
  constructor(private readonly fileUploader: FileUploadService) {}
  async uploadPicture(file: Express.Multer.File) {
    console.log(file);
    return await this.fileUploader.uploadImage(file).catch((err) => {
      console.log(err);

      throw new BadRequestException('Invalid file type.');
    });
  }
}
