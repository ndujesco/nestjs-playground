import { Injectable } from '@nestjs/common';
import FileUploadService from 'src/file_upload/file_upload.interface';

@Injectable()
export class FilesService {
  constructor(private readonly fileUploader: FileUploadService) {}
  uploadPicture(file: Express.Multer.File) {
    console.log(file);

    return this.fileUploader.uploadFile(file);
  }
}
