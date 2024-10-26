import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";
import basicAuth from "express-basic-auth";
import { AppModule } from "./modules/app/app.module";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  app.enableCors({
    origin: ["http://localhost:3000", "https://social-programs-portal.vercel.app"],
    methods: ["PUT", "GET", "DELETE", "OPTIONS", "POST"],
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    })
  );

  const configService: ConfigService<any, boolean> = app.get(ConfigService);
  const appConfig = configService.get("app");
  const swaggerConfig = configService.get("swagger");

  app.setGlobalPrefix("api");

  app.use(
    ["/docs"],
    basicAuth({
      challenge: true,
      users: {
        admin: swaggerConfig.password,
      },
    })
  );

  const options = new DocumentBuilder()
    .setTitle("social-programs-portal-api")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(appConfig.port);
};

bootstrap();
