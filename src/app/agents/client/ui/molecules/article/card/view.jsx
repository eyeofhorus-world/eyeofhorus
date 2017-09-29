
import React from 'react';

import Card from '../../../atoms/card';
import Divider from '../../../atoms/divider';

import Content from './content';
import ContentAttributes from './content-attributes';
import Attributes from './attributes';
import AttributeComposer from './attribute-composer';

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);

    this.previouslyFailed = false;
  }
  render() {
    let animationClasses = '';
    if (this.previouslyFailed !== true && this.props.failed === true) {
      animationClasses = ' animated shake ';
    }
    this.previouslyFailed = this.props.failed === true;
    return (
      <Card className={`${animationClasses}`} style={Object.assign({}, {
      }, this.props.style || {})}>
        <Content value={this.props.value}/>
        <ContentAttributes usecases={this.props.usecases} value={this.props.value}/>

        <Divider/>

        <AttributeComposer value={this.props.value} usecases={this.props.usecases}/>

        <Attributes usecases={this.props.usecases} value={this.props.value}/>
      </Card>
    );
  }
}

ArticleCard.propTypes = {
  style: React.PropTypes.object,

  usecases: React.PropTypes.object,
  value: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types

  failed: React.PropTypes.bool,
};

export default ArticleCard;
