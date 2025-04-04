import { configDotenv } from 'dotenv';
import getApp from './app';

configDotenv();

async function bootstrap(): Promise<void> {
  const app = await getApp();
  await app.listen(3000);
}

bootstrap();
