# Usa una imagen base de Node.js
FROM node:20.10.0-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo de dependencias al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install --omit=dev

# Copia el resto de los archivos al contenedor
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto en el que la aplicación se ejecuta
EXPOSE 3000

# Establece NODE_ENV desde las variables de entorno
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
