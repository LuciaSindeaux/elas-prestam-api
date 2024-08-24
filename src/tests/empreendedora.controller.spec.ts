import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { v4 as uuidv4 } from 'uuid';

let app: INestApplication;

beforeAll(async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('EmpreendedoraController (e2e)', () => {
  it('Deve realizar o cadastro de uma empreendedora e os servicos que ela oferece', async () => {
    const id = uuidv4();
    const nome = 'Maria Julia da Silva';
    const endereco = 'Rua Ceara, 123';
    const telefone = '42984441844';
    const cidade = 'Fortaleza';
    const servicosPrestados = [
      { descricao: 'copyWriting' },
      { descricao: 'design' },
      { descricao: 'marketing' },
    ];

    const response = await request(app.getHttpServer())
      .post('/empreendedoras')
      .send({
        id,
        nome,
        endereco,
        telefone,
        cidade,
        servicosPrestados,
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id,
      nome,
      endereco,
      telefone,
      cidade,
      servicosPrestados,
    });
    console.log(response.body);
  });
});