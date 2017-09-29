
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import palette from './palette';

const muiThemeOptions = Object.assign({}, lightBaseTheme);

muiThemeOptions.palette.primary1Color = palette.blackOlive;
muiThemeOptions.palette.accent1Color = palette.pureWhite;
muiThemeOptions.userAgent = 'all';

const muiTheme = getMuiTheme(muiThemeOptions);

export default muiTheme;
