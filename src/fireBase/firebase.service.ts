import { Injectable } from '@nestjs/common';
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import * as path from 'path';

@Injectable()
export class FirebaseService {
  private storage;

  constructor() {
    const serviceAccount = require(path.resolve(__dirname, '../../config/serviceAccountKey.json'));

    initializeApp({
      credential: cert(serviceAccount),
      storageBucket: 'mileupapp-fd9da.appspot.com', // Asegúrate de que este nombre sea correcto
    });

  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    this.storage = getStorage();

    if (!file.buffer) {
      throw new Error('El archivo no tiene contenido.');
    }

    const bucket = this.storage.bucket();
    const fileUpload = bucket.file(file.originalname);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        console.error('Error al subir el archivo:', err);
        reject(err);
      });

      stream.on('finish', async () => {
        const publicUrl = fileUpload.publicUrl();
        console.log('Archivo subido exitosamente:', publicUrl);
        resolve(publicUrl);
      });

      stream.end(file.buffer);
    });
  }

   // Método para listar imágenes
   async listImages(): Promise<string[]> {
    this.storage = getStorage();

    const bucket = this.storage.bucket();
    const [files] = await bucket.getFiles();
    const urls = files.map(file => file.publicUrl());
    return urls;
  }

  //obtener imagenes por nombre
  async getImageUrl(fileName: string): Promise<string> {
    this.storage = getStorage();
    
    const bucket = this.storage.bucket();
    const file = bucket.file(fileName);
  
    // Verifica si el archivo existe
    const [exists] = await file.exists();
    if (!exists) {
      throw new Error('File not found');
    }
  
    // Obtener la URL correcta del archivo
    const [metadata] = await file.getMetadata();
    
    // Construir la URL de acceso
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
    
    return url;
  }
  

}
