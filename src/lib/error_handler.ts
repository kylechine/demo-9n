/**
 * NPM package: [body-parser v1.19.0] returns HTTP 500 when invalid JSON is received.
 * This error-handler change this behaviour by sending HTTP 400 instead.
 */

import * as express from 'express';
import { D9NError } from './D9NError';

function error_handler(err:Error, _req:express.Request, res:express.Response, next:express.NextFunction): void
{
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof SyntaxError)
  {
    let error = new D9NError( { message:    'Could not decode request: JSON parsing failed', code:'1' },
                              { statusCode: '400',
                                headers:    { 'Content-Type': 'application/json' },
                                body:       { error: 'Could not decode request: JSON parsing failed' }
                              },
                              err );
    next(error);
  }
  else
  {
    next(err);
  }
}

export { error_handler };
