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
    const estado = 'CE';
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
        estado,
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
      estado,
      servicosPrestados,
    });
  });

  it('Deve retornar uma lista de empreendedoras cadastradas', async () => {
    const response = await request(app.getHttpServer())
      .get('/empreendedoras')
      .send();
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Deve criar uma empreendedora e atualizar o telefone e endereço', async () => {
    const id = uuidv4();
    const nome = 'Fernanda Maria';
    const endereco = 'Rua da subida, 123';
    const telefone = '42984441844';
    const cidade = 'Ponta grossa';
    const estado = 'PR';
    const servicosPrestados = [
      { descricao: 'Bolos decorados' },
      { descricao: 'cento de docinhos' },
      { descricao: 'cento de salgados' },
    ];

    const createResponse = await request(app.getHttpServer())
        .post('/empreendedoras')
        .send({
            id,
            nome,
            endereco,
            cidade,
            estado,
            telefone,
            servicosPrestados,
        });
    expect(createResponse.status).toBe(201);
    const createdId = createResponse.body.id;

    const updatedTelefone = '41999999999';
    const updatadEndereco = 'Rua da descida, 321';

    const updateResponse = await request(app.getHttpServer())
        .patch(`/empreendedoras/${createdId}`)
        .send({
            telefone: updatedTelefone,
            endereco: updatadEndereco,
        });
    expect(updateResponse.status).toBe(200);

    const getResponse = await request(app.getHttpServer())
        .get(`/empreendedoras/${createdId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toMatchObject({
        id: createdId,
        telefone: updatedTelefone,
        endereco: updatadEndereco,
    });
});

  it('Deve criar uma empreendedora e serviços e retornar o cadastro passando o ID', async () => {
    const id = uuidv4();
    const nome = 'Jessica da silva';
    const endereco = 'Rua Parana, 123';
    const telefone = '42984441844';
    const cidade = 'Ponta Grossa';
    const estado = 'PR';
    const servicosPrestados = [
      { descricao: 'Pedreira' },
      { descricao: 'Pintora' },
      { descricao: 'Eletricista' },
    ];

    const createResponse = await request(app.getHttpServer())
      .post('/empreendedoras')
      .send({
        id,
        nome,
        endereco,
        telefone,
        cidade,
        estado,
        servicosPrestados,
      });
    expect(createResponse.status).toBe(201);

    const getResponse = await request(app.getHttpServer())
      .get(`/empreendedoras/${id}`)
      .send();
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toMatchObject({
      id,
      nome,
      endereco,
      telefone,
      cidade,
      estado,
      servicosPrestados,
    });
  });

  it('Deve criar uma empreendedora e serviços e Deletar o cadastro passando o ID', async () => {
    const id = uuidv4();
    const nome = 'Jessica da silva';
    const endereco = 'Rua Parana, 123';
    const telefone = '42984441844';
    const cidade = 'Ponta Grossa';
    const estado = 'PR';
    const servicosPrestados = [
      { descricao: 'Pedreira' },
      { descricao: 'Pintora' },
      { descricao: 'Eletricista' },
    ];

    const createResponse = await request(app.getHttpServer())
      .post('/empreendedoras')
      .send({
        id,
        nome,
        endereco,
        telefone,
        cidade,
        estado,
        servicosPrestados,
      });
    expect(createResponse.status).toBe(201);
    const createdId = createResponse.body.id;

    const deleteResponse = await request(app.getHttpServer()).delete(
      `/empreendedoras/${createdId}`,
    );
  });
});
