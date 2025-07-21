import { NestFactory } from '@nestjs/core';
import * as express from "express";
import { join } from "path";
import { ApiModule } from './api.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, {
    cors: {
      origin: ["http://localhost:3000", "http://www.astrobolo.com/"],
      credentials: true,
      exposedHeaders: ["Authorization", "publicationid"],
    },
  });

  // 🔥 Serve static files from the 'uploads' folder
  app.use("/uploads", express.static(join(process.cwd(), "uploads")));

  // ✅ Serve chat images from 'public/chat-images'
  app.use("/chat-images", express.static(join(process.cwd(), "public/chat-images")));

  const host = process.env.API_HOST || "0.0.0.0";
  const port = process.env.API_PORT || 4000;
  const globalPrefix = process.env.API_PREFIX || "";

  await app.listen(port, host);

  Logger.log(
    `🚀 👧Application is running on: http://${host}:${port}/${globalPrefix}`
  );
  Logger.log(`📷 Serving chat images from: http://${host}:${port}/chat-images`);
}

bootstrap();
