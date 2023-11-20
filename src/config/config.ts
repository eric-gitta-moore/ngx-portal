import logger from '../util/logger';
import { processEnv } from '../util/config';

export const svg2bitmapUrl = `http://${processEnv.svg2bitmapHost}/svg2bitmap`;

export const ngxRenderUrl = `http://${processEnv.ngxRenderHost}/home`;
