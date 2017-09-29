
import palette from './palette';
import dimens from './dimens';

const shadowStyle = elevationPixels => `0 0 ${elevationPixels} 0 ${palette.semiTransparentGrey}, 0 ${elevationPixels} ${elevationPixels} 0 ${palette.semiTransparentGreyDouble}`;

export default {
  elevationPixels0: 'none',
  elevationPixels2: shadowStyle(dimens.pixels2),
  elevationPixels4: shadowStyle(dimens.pixels4),
  elevationPixels6: shadowStyle(dimens.pixels6),
  elevationPixels8: shadowStyle(dimens.pixels8),
};
