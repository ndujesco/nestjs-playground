import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FileUploadModule } from 'src/file_upload/file_upload.module';

@Module({
  imports: [FileUploadModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
