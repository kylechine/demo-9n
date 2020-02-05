/**
 * Show class: The class describes a single show.
 */

import { D9NError          } from './D9NError';
import { Request as Inputs } from './type/Request';
import { Show    as Input  } from './type/Show';

// Errors
const errors = {

  generic: (
    new D9NError( { message:    'Could not decode request: JSON parsing failed', code:'1' },
                  { statusCode: '400',
                    headers:    { 'Content-Type': 'application/json' },
                    body:       { error: 'Could not decode request: JSON parsing failed'}
                  }
    )
  ),

  drm: (
    new D9NError( { message:    'Could not decode request: invalid DRM', code:'2' },
                  { statusCode: '400',
                    headers:    { 'Content-Type': 'application/json' },
                    body:       { error: 'Could not decode request: invalid DRM'}
                  }
    )
  ),

  episodeCount: (
    new D9NError( { message:    'Could not decode request: invalid episodeCount', code:'3' },
                  { statusCode: '400',
                    headers:    { 'Content-Type': 'application/json' },
                    body:       { error: 'Could not decode request: invalid episodeCount'}
                  }
    )
  ),

  image: (
    new D9NError( { message:    'Could not decode request: invalid image', code:'4' },
                  { statusCode: '400',
                    headers:    { 'Content-Type': 'application/json' },
                    body:       { error: 'Could not decode request: invalid image'}
                  }
    )
  ),

  slug: (
    new D9NError( { message:    'Could not decode request: invalid slug', code:'5' },
                  { statusCode: '400',
                    headers:    { 'Content-Type': 'application/json' },
                    body:       { error: 'Could not decode request: invalid slug'}
                  }
    )
  ),

  title: (
    new D9NError( { message:    'Could not decode request: invalid title', code:'6' },
                  { statusCode: '400',
                    headers:    { 'Content-Type': 'application/json' },
                    body:       { error: 'Could not decode request: invalid title'}
                  }
    )
  ),

}; // End of Errors

class Show
{
  public readonly drm:          boolean;
  public readonly episodeCount: number;
  public readonly image:        string;
  public readonly slug:         string;
  public readonly title:        string;

  public constructor(input: Input)
  {
    this.drm          = input.drm;
    this.episodeCount = input.episodeCount;
    this.image        = input.image;
    this.slug         = input.slug;
    this.title        = input.title;
  }

  /**
   * Clean client inputs and generate Show instances.
   * @param  inputs      Data from client
   * @return             Array of Show instances
   * @throw  {D9NError}
   */
  static genShows(inputs: Inputs):Show[]
  {
    let shows = []; // Instances of Show class

    // Filter valid inputs and create instances of Show class
    if ('payload' in inputs === false || Array.isArray(inputs.payload) === false)
    {
      throw errors.generic;
    }
    else
    {
      let payload = inputs.payload;
      let i       = 0;

      for (let key in payload)
      {
        if ( ( 'drm'          in payload[key]       === false       ||
               typeof payload[key].drm              !== 'boolean' ) ||

             ( 'episodeCount' in payload[key]       === false       ||
               typeof payload[key].episodeCount     !== 'number' )  ||

             ( 'image'        in payload[key]       === false       ||
               'showImage'    in payload[key].image === false       ||
               typeof payload[key].image.showImage  !== 'string'    ||
               payload[key].image.showImage.length  === 0 )         ||

             ( 'slug'         in payload[key]       === false       ||
               typeof payload[key].slug             !== 'string'    ||
               payload[key].slug.length             === 0 )         ||

             ( 'title'        in payload[key]       === false       ||
               typeof payload[key].title            !== 'string'    ||
               payload[key].title.length            === 0 )
        )
        { continue; }

        shows[i] = new Show( { drm:          payload[key].drm,
                               episodeCount: payload[key].episodeCount,
                               image:        payload[key].image.showImage,
                               slug:         payload[key].slug,
                               title:        payload[key].title } );
        i++;
      }
    } // End of else

    // Return
    if (shows.length === 0)
      { throw errors.generic; }
    else
      { return shows; }
  } // End of genShows

} // End of class

export { Show };
