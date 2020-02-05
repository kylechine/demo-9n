/**
 * all_handler: a HTTP handler for rejecting non-allowed HTTP methods
 */

import { generator, gen_response } from '@leismore/all_handler';
import { D9NError }                from './D9NError';

const ALLOWED = ['OPTIONS', 'POST'];

let error   = new D9NError(
  { message: "HTTP 405: Method Not Allowed", code: "8" },
  gen_response(ALLOWED)
);

let all_handler = generator(ALLOWED, error);

export { all_handler };
