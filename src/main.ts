import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { CoreModule } from './core/core.module';
import { ConfigService } from '@nestjs/config';
import { getCorsConfig } from './config/cors.config';


async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  const config = app.get(ConfigService)
  const logger = new Logger(CoreModule.name)

  const port = config.getOrThrow<number>('BACK_ORIGIN')
  const host = config.getOrThrow<string>('BACK_PORT')

  app.use(cookieParser());
  app.use(json({ limit: '6mb' }));
  app.use(urlencoded({ limit: '6mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.enableCors(getCorsConfig(config));

  try {
    await app.listen(host)

    logger.log(`Server is running at: ${port}`)
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`, error)
    process.exit(1)
  }
}
bootstrap();
