import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import { memoryStorage } from 'multer';
import { diskStorage } from 'multer';

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/images/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + '-' + file.originalname);
  },
});

// const storage = memoryStorage();

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      preservePath: true,
      storage,
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = await this.filesService.uploadPicture(file);
    return { message: true, response };
  }
}
