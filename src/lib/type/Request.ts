/**
 * Request Data Structure
 */

type Request = {

  payload: {
    drm:          boolean,
    episodeCount: number,
    image:        { showImage: string },
    slug:         string,
    title:        string
  }[],

  skip:         number,
  take:         number,
  totalRecords: number
};

export { Request };
