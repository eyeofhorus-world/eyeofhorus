
import React from 'react';

import dimens from '../../framework/config/dimens';
import palette from '../../framework/config/palette';

const dashedLineSvg = // eslint-disable-line no-unused-vars
`<svg width="40px" height="2px" viewBox="0 0 40 2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs></defs>
<g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square" stroke-opacity="0.12" stroke-dasharray="10,10,10,10">
    <g id="atoms/divider/dashed" stroke="#000000">
        <path d="M0,1 L40,1" id="Line"></path>
    </g>
</g>
</svg>`;

const dashedLineSvgBase64 = 'Cjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iMnB4IiB2aWV3Qm94PSIwIDAgNDAgMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJTeW1ib2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2Utb3BhY2l0eT0iMC4xMiIgc3Ryb2tlLWRhc2hhcnJheT0iMTAsMTAsMTAsMTAiPgogICAgICAgIDxnIGlkPSJhdG9tcy9kaXZpZGVyL2Rhc2hlZCIgc3Ryb2tlPSIjMDAwMDAwIj4KICAgICAgICAgICAgPHBhdGggZD0iTTAsMSBMNDAsMSIgaWQ9IkxpbmUiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==';

class Divider extends React.Component {
  render() {
    return (
      <div style={Object.assign({}, {
        width: dimens.percent100,
        display: 'block',
      }, this.props.dashed === true ? {
        background: `url('data:image/svg+xml;base64,${dashedLineSvgBase64}')`,
        height: dimens.pixels2,
        marginBottom: dimens.pixelsneg2,
      } : {
        backgroundColor: palette.semiTransparentGrey,
        height: dimens.pixels1,
      }, this.props.style || {})}/>
    );
  }
}

Divider.propTypes = {
  style: React.PropTypes.object,
  
  dashed: React.PropTypes.bool,
};

export default Divider;
