
import React from 'react';

import dimens from '../../../framework/config/dimens';

import PlatformResponsiveLayout from '../../atoms/layouts/platform-responsive';
import VerticalLayout from '../../atoms/layouts/vertical';
import CenterHorizontallyLayout from '../../atoms/layouts/center-horizontally';
import OppositeHorizontalAlignmentPairLayout from '../../atoms/layouts/opposite-horizontal-alignment-pair';

import Logo, { logoHeight } from '../../atoms/logo';

import Session from '../../molecules/session';

class Toolbar extends React.Component {
  render() {
    return (
      <PlatformResponsiveLayout mobile={() => (
        <VerticalLayout>
          <CenterHorizontallyLayout style={{
            marginTop: dimens.pixels8,
          }}>
            <Logo/>
          </CenterHorizontallyLayout>
          <CenterHorizontallyLayout style={{
            marginTop: dimens.pixels16,
          }}>
            <Session/>
          </CenterHorizontallyLayout>
        </VerticalLayout>
      )} tabletAndAbove={() => (
        <VerticalLayout>
          <CenterHorizontallyLayout>
            <OppositeHorizontalAlignmentPairLayout style={{
              minWidth: dimens.pixels768,
              maxWidth: dimens.pixels768,
              width: dimens.pixels768,
            }} leftAligned={() => (
              <Logo style={{
                marginLeft: dimens.pixels32,
              }}/>
            )} rightAligned={() => (
              <Session style={{
                marginRight: dimens.pixels32,
                height: logoHeight,
              }}/>
            )}/>
          </CenterHorizontallyLayout>
        </VerticalLayout>
      )}/>
    );
  }
}

export default Toolbar;
