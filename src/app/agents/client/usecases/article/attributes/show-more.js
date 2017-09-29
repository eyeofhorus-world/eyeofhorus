
import Immutable from 'immutable';

import PromiseGroup from '../../../../../utilities/promise-group';

import arrayHelpers from '../../../../../helpers/array-helpers';

export default class ArticleAttributesShowMore {
  constructor(articleProvider, present) {
    this.articleProvider = articleProvider;
    this.present = present;

    this.run = this.run.bind(this);
  }
  run(userTrackingContext, articleQuote, skipThisMany) {
    const self = this;
    return self.articleProvider.getMoreAttributes(articleQuote, skipThisMany, userTrackingContext.toJS()).then(value => Promise.resolve({ 
      attributes: Immutable.fromJS(value.attributes || []),
      areThereMoreAttributes: value.areThereMoreAttributes, 
    })).then(({ attributes, areThereMoreAttributes }) => {
      const promiseGroup = new PromiseGroup();
      const presentableAttributes = [];
      attributes.forEach((attribute, index) => {
        promiseGroup.add(self.present.attribute.run(attribute).then((presentableAttribute) => {
          if (presentableAttribute) {
            presentableAttributes.push({ key: index, value: presentableAttribute });
          }
          return Promise.resolve({});
        }));
      });
      return promiseGroup.finishAll().then(() => Promise.resolve({
        attributes: Immutable.fromJS(arrayHelpers.sortArrayByKeyAsNumber(presentableAttributes).map(box => box.value)),
        areThereMoreAttributes,
      }));
    });
  }
}
