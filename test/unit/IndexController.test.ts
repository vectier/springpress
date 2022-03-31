import request from 'supertest';
import http from 'http';
import { Server } from '@/Server';

describe('Test the IndexController response', () => {

  let httpServer: http.Server;
  let appServer: Server;

  beforeAll(() => {
    appServer = new Server(3000);
    httpServer = appServer.run();
  });

  afterAll(() => {
    httpServer.close();
  });

  it('should not provide x-powered-by in the header', async () => {
    const response = await request(httpServer).get('/');
    expect(response.headers['x-powered-by']).toBeUndefined();
  });

  it('should response with HTTP code 200', () => {
    return request(httpServer)
      .get('/')
      .expect(200);
  });

  it('should response with HTTP code 404', () => {
    return request(httpServer)
      .get('/404')
      .expect(404);
  });

  it('should response with HTTP code 500', () => {
    return request(httpServer)
      .get('/500')
      .expect(500);
  });

});
