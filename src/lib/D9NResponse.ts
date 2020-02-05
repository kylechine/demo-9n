/**
 * D9NResponse class: HTTP response sender
 */

import { Response }            from '@leismore/response';
import { Show }                from './Show';
import { Response as ResBody } from './type/Response';

class D9NResponse extends Response
{
  public res200(shows: Show[]):void
  {
    let resBody:ResBody = { response: [] };
    let i = 0;

    for (let key in shows)
    {
      if (shows[key].drm === true && shows[key].episodeCount >= 1)
      {
        resBody.response[i] = { image: shows[key].image, slug: shows[key].slug, title: shows[key].title };
        i++;
      }
    }

    this.send({
      statusCode: '200',
      headers: {'Content-Type': 'application/json'},
      body: resBody
    });
  }
}

export { D9NResponse };
