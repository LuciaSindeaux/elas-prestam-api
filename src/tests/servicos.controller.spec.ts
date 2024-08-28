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

describe('Serviços Controller (e2e)', () => {
  it('Deve realizar o cadastro de um serviço', async () => {
    const id = uuidv4();
    const descricao = 'copyWriting';

    const response = await request(app.getHttpServer()).post('/servicos').send({
      id,
      descricao,
    });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id,
      descricao,
    });
  });

  it('Deve retornar uma lista de serviços cadastrados', async () => {
    const response = await request(app.getHttpServer()).get('/servicos').send();
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
 
  it('Deve criar um serviço e depois retornar informando um id', async () => {
    const id = uuidv4();
    const descricao = 'Mecanica hidraulica';

    const createResponse = await request(app.getHttpServer())
      .post('/servicos')
      .send({
        id,
        descricao,
      });
    expect(createResponse.status).toBe(201);

    const getResponse = await request(app.getHttpServer())
      .get(`/servicos/${id}`)
      .send();
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toMatchObject({
      id,
      descricao,
    });
  });

  it('Deve  um serviço e depois excluir informando um id', async () => {
    const id = uuidv4();
    const descricao = 'Desenvolvimento de software';

    const createResponse = await request(app.getHttpServer())
      .post('/servicos')
      .send({
        id,
        descricao,
      });

    expect(createResponse.status).toBe(201);

    const createdId = createResponse.body.id;

    const deleteResponse = await request(app.getHttpServer()).delete(
      `/servicos/${createdId}`,
    );
    expect(deleteResponse.status).toBe(200);
  });

  it('Deve criar um serviço e depois atualizar a descrição ele', async () => {
    const id = uuidv4();
    const descricao = 'Criação de artes para redes sociais';
  
    const createResponse = await request(app.getHttpServer())
      .post('/servicos')
      .send({
        id,
        descricao,
      });
    expect(createResponse.status).toBe(201);
    const createdId = createResponse.body.id;
  
    const updatedDescricao = 'Criação de artes e videos para redes sociais';
  
    const updateResponse = await request(app.getHttpServer())
      .patch(`/servicos/${createdId}`)
      .send({
        descricao: updatedDescricao,
      });
    expect(updateResponse.status).toBe(200);
  
    const getResponse = await request(app.getHttpServer()).get(
      `/servicos/${createdId}`,
    );
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toMatchObject({
      id: createdId,
      descricao: updatedDescricao,
    });
  });

});
