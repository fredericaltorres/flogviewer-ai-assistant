import { promises as fs } from 'fs';
import { join } from 'path';


// http://localhost:3000/api/chat2?name=freddy&debug=true

export async function GET(req: Request) {

  const url = new URL(req.url);
  const name = url.searchParams.get("name");
  const debug = url.searchParams.get("debug") === 'true';

  return new Response(`Hello ${name}, ${debug ? 'debug' : 'not debug'}, you are using ${req.method}`);
}