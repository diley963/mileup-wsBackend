import { Injectable } from '@nestjs/common';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { ServiceAccount } from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService {
  private storage;

  constructor() {
    // Aquí debes colocar la configuración de tu servicio
    const serviceAccount = require(path.resolve(__dirname, '../config/serviceAccountKey.json'));



    initializeApp({
      credential: cert(serviceAccount),
      storageBucket: 'your-project-id.appspot.com', // Reemplaza con tu bucket
    });

    this.storage = getStorage();
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = this.storage.bucket();
    const fileUpload = bucket.file(file.originalname);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        reject(err);
      });

      stream.on('finish', async () => {
        resolve(fileUpload.publicUrl());
      });

      stream.end(file.buffer);
    });
  }
}
