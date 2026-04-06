import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';
import * as pino from 'pino';

const logger = pino.pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: false,
  });

  // Setup logger
  app.use((req, res, next) => {
    logger.info({
      method: req.method,
      path: req.path,
      ip: req.ip,
    });
    next();
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';

  // Enable CORS
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN').split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Setup WebSocket adapter
  app.useWebSocketAdapter(new IoAdapter(app));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger configuration
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Emergent API')
      .setDescription('Private messenger for developers API documentation')
      .setVersion('0.1.0')
      .addBearerAuth()
      .addServer(`http://localhost:${port}`, 'Development')
      .addTag('Auth', 'Authentication endpoints')
      .addTag('Users', 'User management')
      .addTag('Workspaces', 'Workspace management')
      .addTag('Channels', 'Channel management')
      .addTag('Messages', 'Message operations')
      .addTag('Files', 'File upload and storage')
      .addTag('Health', 'Health checks')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(port, '0.0.0.0', () => {
    logger.info(`🚀 Server running on port ${port} (${nodeEnv})`);
  });
}

bootstrap().catch(err => {
  logger.error(err, 'Bootstrap error');
  process.exit(1);
});
