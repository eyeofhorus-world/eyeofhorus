
import React from 'react';

import dimens from '../../framework/config/dimens';

import ExternalContext from '../atoms/external-context';
import ContainerWindowSize from '../atoms/container-window-size';
import Container from '../atoms/container';

class HeaderContentFooterTemplate extends React.Component {
  render() {
    return (
      <Container style={{
        minWidth: dimens.pixels320,
      }}>
        <ExternalContext>
          <ContainerWindowSize style={{
            display: 'flex',
            flexDirection: 'column',
            height: undefined,
          }}>
            {this.props.header()}
            {this.props.content({
              width: dimens.percent100,
              clear: 'left',
              flexGrow: 1,
            })}
            {this.props.dialog()}
            {this.props.footer({
              marginTop: dimens.pixels48,
            })}
          </ContainerWindowSize>
        </ExternalContext>
      </Container>
    );
  }
}

HeaderContentFooterTemplate.propTypes = {
  header: React.PropTypes.func,
  content: React.PropTypes.func,
  dialog: React.PropTypes.func,
  footer: React.PropTypes.func,
};

export default HeaderContentFooterTemplate;
