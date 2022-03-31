import { Server } from '@/Server';

try {
  console.log('Starting up the application...');
  const server = new Server(3000);
  server.run();
} catch (error: Error | unknown) {
  if (error instanceof Error) {
    console.log(`${error.name}: ${error.message}`);
    console.log('Closing the application...');
    process.exit(1);
  }
}
