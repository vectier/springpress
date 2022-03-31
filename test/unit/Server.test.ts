import http from 'http';
import { Server } from '@/Server';

describe('Test implementation of Server abstract class', () => {

  let httpServer: http.Server;

  afterEach(() => {
    httpServer.close();
  });

  it('should return http server', () => {
    httpServer = new Server(3000).run();
    expect(httpServer).toBeInstanceOf(http.Server);
  });

});
