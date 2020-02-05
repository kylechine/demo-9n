/**
 * HTTP POST handler 1
 */

import * as express    from 'express';
import { Show }        from './Show';
import { D9NError }    from './D9NError';
import { D9NResponse } from './D9NResponse';

function post_handler1(req:express.Request, res:express.Response, next:express.NextFunction): void
{
  let resp = new D9NResponse(res);
  let shows:Show[] = [];

  // Test media type
  if ( req.is('application/json') === false )
  {
    let error = { message: 'HTTP header missing: "Content-Type: application/json', code: '7' };
    let response = {
      statusCode: '400',
      headers:    { 'Content-Type': 'application/json' },
      body:       { error: 'HTTP header missing: "Content-Type: application/json' }
    };
    next( new D9NError(error, response) );
    return;
  }

  // Filter Shows
  try
  {
    shows = Show.genShows(req.body);
  }
  catch (e)
  {
    next (e);
    return;
  }

  // Send response
  resp.res200(shows);
}

export { post_handler1 };
