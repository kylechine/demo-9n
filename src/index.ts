/**
 * Main Script
 */

// Import modules
import * as express                from 'express';
import cors                        = require('cors');
import bodyParser                  = require('body-parser');
import { error_handler_last }      from '@leismore/error_handler_last';
import { all_handler }             from './lib/all_handler';
import { post_handler1 }           from './lib/post_handler1';
import * as CONFIG                 from './config.json';

const corsOptions:cors.CorsOptions = {
  origin:  '*',
  methods: ['OPTIONS', 'POST']
};

// Init.
let app = express();
app.use( cors(corsOptions), bodyParser.json() );

// Handlers
app.all(     '/', all_handler );
app.options( '/', ()=>{} );
app.post(    '/', post_handler1 );

// Error handling
app.use( error_handler_last );

// Start server
app.listen( Number(CONFIG.port),
            CONFIG.host,
            CONFIG.backlog,
  () => {
    console.log(
      `[Demo_9N] is working on ` +
      `<${CONFIG.host}:${CONFIG.port}>`
    );
  }
);
