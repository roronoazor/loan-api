import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { EntityNotFoundFilter } from './exceptions/404.exception';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.useGlobalFilters(new EntityNotFoundFilter());
  const config = new DocumentBuilder()
  .setTitle('Demo Loan Api')
  .setDescription('The Demo Loan API description')
  .setVersion('0.1')
  .addTag('loanApi')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(5000, () => {
    console.log(`Application listening at port 5000`);
  });
}
bootstrap();
