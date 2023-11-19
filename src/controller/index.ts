import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  const param = Object.assign({}, req.params, req.body);

  res.send('ngx-portal service');
}
