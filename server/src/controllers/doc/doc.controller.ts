import { Request, Response } from 'express';
import path from 'path';
import fs from 'node:fs/promises';

export const apiDoc = async (req: Request, res: Response) => {

    const resolvedPath = path.resolve(process.cwd(), 'src' )
    const filepath = path.join(resolvedPath, 'docs', 'index.html')
    const file = await fs.readFile(filepath, { encoding: 'utf8' } );
  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(file);
    return res.end();

}

export const distJson = async (req: Request, res: Response) => {

    const filePath = path.resolve(process.cwd(), 'src');

    return res.status(200).sendFile(path.join(filePath, 'docs', 'dist.json'));
}