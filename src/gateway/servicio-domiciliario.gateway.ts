import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // Cambia esto según tu política de CORS
    },
  })
  export class ServicioDomiciliarioGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    afterInit(server: Server) {
      console.log('WebSocket Initialized');
    }
  
    handleConnection(client: any) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: any) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    sendUpdateToClients(data: any) {
      this.server.emit('update', data); // Emitir evento de actualización
    }
  }
  