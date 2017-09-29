
import Immutable from 'immutable';

import PromiseGroup from '../../../../utilities/promise-group';

import { unescape } from '../../../../helpers/string-helpers';
import arrayHelpers from '../../../../helpers/array-helpers';

export default class ArticleResultConditioner {
  constructor(attribute, score) {
    this.attribute = attribute;
    this.score = score;

    this.run = this.run.bind(this);
    this.convertId = this.convertId.bind(this);
    this.convertQuote = this.convertQuote.bind(this);
    this.convertTruthfulnessScoreToPresentationModel = this.converTruthfulnessScoreToPresentationModel.bind(this);
    this.convertAttributesToPresentationModel = this.convertAttributesToPresentationModel.bind(this);
    this.calculateSize = this.calculateSize.bind(this);
  }
  run(articleResult) {
    const self = this;
    return Promise.resolve(articleResult || Immutable.fromJS({}))
      .then(result => self.convertId(result))
      .then(result => self.convertQuote(result))
      .then(result => self.convertTruthfulnessScoreToPresentationModel(result))
      .then(result => self.convertAttributesToPresentationModel(result))
      .then(result => self.calculateSize(result));
  }
  convertId(result) {
    return Promise.resolve(result);
  }
  convertQuote(result) {
    return Promise.resolve(result.set('quote', 
      unescape(result.get('quote') || '')));
  }
  converTruthfulnessScoreToPresentationModel(result) {
    return this.score.run(result.get('truthful')).then(
      scorePresentable => Promise.resolve(
        result.delete('truthful').set('truthful', scorePresentable)));
  }
  convertAttributesToPresentationModel(input) {
    const result = (input || Immutable.fromJS({}));
    const attributes = (result.get('attributes') || Immutable.fromJS([]));

    const self = this;
    const promiseGroup = new PromiseGroup();
    const output = [];
    attributes.forEach((attribute, index) => {
      promiseGroup.add(self.attribute.run(attribute).then((attributePresentable) => {
        if (attributePresentable) {
          output.push({ key: index, value: attributePresentable });
        }
        return Promise.resolve({});
      }));
    });

    return promiseGroup.finishAll({ unbox: true, noreject: true }).then(() => Promise.resolve(
      result.delete('attributes').set('attributes', Immutable.fromJS(
        arrayHelpers.sortArrayByKeyAsNumber(output).map(box => box.value)))));
  }
  calculateSize(resultNullable) {
    return Promise.resolve(resultNullable || Immutable.fromJS({}))
      .then((result) => {
        const textContentSize = (contentNullable, smallerTextSize = false) => {
          const content = contentNullable || '';

          const sizeOfALine = smallerTextSize === true ? 17 : 25;
          const lettersPerLineEstimate = 32;
          
          return sizeOfALine * Math.min(1, content.length / lettersPerLineEstimate);  
        };

        const contentPadding = 108;
        const contentSize = contentPadding + textContentSize(result.get('quote'));

        let attributesSize = 0;
        const perAttributePadding = 90;
        const attributes = result.get('attributes') || Immutable.fromJS([]);
        attributes.forEach((attribute) => {
          attributesSize += perAttributePadding + textContentSize(attribute.get('name'), true);
        });

        return Promise.resolve({ result, resultSize: contentSize + attributesSize });
      })
      .then(({ result, resultSize }) => Promise.resolve(
        result.set('estimatedSize', resultSize)));
  }
}
