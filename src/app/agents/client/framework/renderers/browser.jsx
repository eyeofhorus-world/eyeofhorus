
import serialize from 'serialize-javascript';

export const render = (reactMarkup, storeState) => `<!doctype html>\n
<html>
  <head>
    <meta name="viewport"
      content="
        user-scalable=no,
        initial-scale=1,
        maximum-scale=1,
        minimum-scale=1,
        width=device-width,
        height=device-height,
        target-densitydpi=device-dpi" />

    <title>Eye of Horus</title>

    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/favicon.ico/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favicon.ico/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicon.ico/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicon.ico/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/favicon.ico/apple-touch-icon-60x60.png" />
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/favicon.ico/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/favicon.ico/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/favicon.ico/apple-touch-icon-152x152.png" />
    <link rel="icon" type="image/png" href="/favicon.ico/favicon-196x196.png" sizes="196x196" />
    <link rel="icon" type="image/png" href="/favicon.ico/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="/favicon.ico/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/favicon.ico/favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="/favicon.ico/favicon-128.png" sizes="128x128" />
    <meta name="application-name" content="Eye of Horus"/>
    <meta name="msapplication-TileColor" content="#ffffffff" />
    <meta name="msapplication-TileImage" content="/favicon.ico/mstile-144x144.png" />
    <meta name="msapplication-square70x70logo" content="/favicon.ico/mstile-70x70.png" />
    <meta name="msapplication-square150x150logo" content="/favicon.ico/mstile-150x150.png" />
    <meta name="msapplication-wide310x150logo" content="/favicon.ico/mstile-310x150.png" />
    <meta name="msapplication-square310x310logo" content="/favicon.ico/mstile-310x310.png" />
    

    <style>
      html, body, .app {
        width:100%;
        height:100%;
        margin: 0;
      }

      .visibility-hidden {
        visibility: hidden;
      }

      .display-none {
        display: none;
      }

      .unselectable {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
      }
    </style>
    
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,300i,400,400i,700,900" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Kurale" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:300,300i,400,400i,500" rel="stylesheet">
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">

    <style>
    .material-icons {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;  /* Preferred icon size */
      display: inline-block;
      line-height: 1;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;

      /* Support for all WebKit browsers. */
      -webkit-font-smoothing: antialiased;
      /* Support for Safari and Chrome. */
      text-rendering: optimizeLegibility;

      /* Support for Firefox. */
      -moz-osx-font-smoothing: grayscale;

      /* Support for IE. */
      font-feature-settings: 'liga';
    }
    </style>

    <!--[if lt IE 9]>
    <script>
      (function(){
        var ef = function(){};
        window.console = window.console || {log:ef,warn:ef,error:ef,dir:ef};
      }());
    </script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="app">${reactMarkup}</div>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script type="application/javascript" charset="utf-8">
      window.__PRELOADED_STATE__=${serialize(storeState)};
    </script>
    <script src="/client-bundle.js"></script>
  </body>
</html>
`;

export default (url, { appRendered }) => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
  if (appRendered) {
    const error = null;
    const redirectLocation = null;
    const product = render('', {}); 
    const notFoundProduct = null;
    appRendered(error, redirectLocation, product, notFoundProduct);
  }
});
