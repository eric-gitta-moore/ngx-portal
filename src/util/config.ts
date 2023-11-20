import { config } from 'dotenv';
import path from 'node:path';

config({
  path: path.resolve(
    process.cwd(),
    !process.env.NODE_ENV ? `.env` : `.env.${process.env.NODE_ENV}`,
  ),
});

export interface ProcessEnv extends NodeJS.ProcessEnv {
  APP_PORT: string;
  svg2bitmapHost: string;
  ngxRenderHost: string;
}
export const processEnv: ProcessEnv = process.env as ProcessEnv;
