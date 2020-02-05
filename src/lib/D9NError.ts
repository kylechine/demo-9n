/**
 * Error class for this project
 *
 * Code     Message
 * 1        Could not decode request: JSON parsing failed
 * 2        Could not decode request: invalid DRM
 * 3        Could not decode request: invalid episodeCount
 * 4        Could not decode request: invalid image
 * 5        Could not decode request: invalid slug
 * 6        Could not decode request: invalid title
 * 7        HTTP header missing: "Content-Type: application/json"
 */

import { LMError } from '@leismore/lmerror';

class D9NError extends LMError {}

export { D9NError };
