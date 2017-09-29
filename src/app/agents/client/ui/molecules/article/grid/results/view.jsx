
import Immutable from 'immutable';
import React from 'react';

import dimens from '../../../../../framework/config/dimens';

import Container from '../../../../atoms/container';
import ResponsiveLayout from '../../../../atoms/layouts/responsive';

import ArticleCard from '../../card';

import ShowMore from './show-more';

class ArticleGridResults extends React.Component {
  constructor(props) {
    super(props);
    this.renderGrid = this.renderGrid.bind(this);
  }
  renderGrid({ numberOfColumns }) {
    const self = this;
    const columns = Array(numberOfColumns).fill().map(() => Object.assign({}, { key: '', cards: [], height: 0 }));
    this.props.articles.map(({ key, value, estimatedSize }) => ({ 
      key, 
      value,
      estimatedSize,
      component: (
        <ArticleCard key={key} value={value} usecases={self.props.usecases} style={{
          minWidth: dimens.pixels288,
          maxWidth: numberOfColumns > 1 ? dimens.pixels288 : dimens.pixels352,
          alignSelf: numberOfColumns === 1 ? 'center' : undefined,
          height: 'fit-content',
          width: dimens.percent100,
          marginTop: dimens.pixels16,
        }}/>
      ),
    })).forEach((card) => {
      let column = null;
      columns.forEach((prospectiveColumn) => {
        if (!column || prospectiveColumn.height < column.height) {
          column = prospectiveColumn;
        }
      });

      column.key = `${column.key}${card.key}`;
      column.cards.push(card.component);
      
      column.height += card.estimatedSize;
    });
    const singleColumnStyle = {
      width: dimens.percent100,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      flexWrap: 'nowrap',
    };
    return (
      <Container style={Object.assign({}, {
        marginTop: dimens.pixels16,
      }, this.props.style || {})}>
        <Container style={{
          marginLeft: dimens.pixels8,
          marginRight: dimens.pixels8,
        }}>
          <Container style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'nowrap',
          }}>
            {columns.map(column => (
              <Container key={column.key} style={Object.assign({}, {
                marginLeft: dimens.pixels8,
                marginRight: dimens.pixels8,
              }, numberOfColumns === 1 ? singleColumnStyle : {})}>
                {column.cards.map(card => card)}
              </Container>
            ))}
          </Container>
          <ShowMore usecases={self.props.usecases}/>
        </Container>
      </Container>
    );
  }
  render() {
    const self = this;
    return (
      <ResponsiveLayout breakpoints={[
        {
          at: {
            minWidth: dimens.pixels0i,
            maxWidth: dimens.pixels767i,
          },
          render: () => self.renderGrid({ numberOfColumns: 1 }),
        },
        {
          at: {
            minWidth: dimens.pixels768i,
            maxWidth: dimens.pixels1023i,
          },
          render: () => self.renderGrid({ numberOfColumns: 2 }),
        },
        {
          at: {
            minWidth: dimens.pixels1024i,
            maxWidth: dimens.pixels1439i,
          },
          render: () => self.renderGrid({ numberOfColumns: 3 }),
        },
        {
          at: {
            minWidth: dimens.pixels1440i,
          },
          render: () => self.renderGrid({ numberOfColumns: 4 }),
        },
      ]} style={{
        width: undefined,
      }}/>
    );
  }
}

ArticleGridResults.propTypes = {
  style: React.PropTypes.object,

  usecases: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  articles: React.PropTypes.instanceOf(Immutable.List),
};

export default ArticleGridResults;
