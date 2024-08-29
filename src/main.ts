import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Elas Prestam')
    .setDescription(
      'O "Elas Prestam" permite que mulheres promovam seus serviços e alcancem consumidoras que buscam contratar profissionais qualificadas, fortalecendo redes de apoio e impulsionando o empreendedorismo feminino.',
    )
    .setVersion('1.0')
    .addTag('servicos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
