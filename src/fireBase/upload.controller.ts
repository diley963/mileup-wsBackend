import { Controller, Post, UseInterceptors, UploadedFile, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseService } from './firebase.service';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Express } from 'express';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.firebaseService.uploadFile(file);
    return { fileUrl };
  }

  // Endpoint para listar todas las imágenes
  @Get()
  async listImages() {
    return this.firebaseService.listImages();
  }

  // Endpoint para obtener la URL de una imagen específica
  @Get(':fileName')
  async getImage(@Param('fileName') fileName: string) {
    return this.firebaseService.getImageUrl(fileName);
  }
}
