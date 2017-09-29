
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
  en: {
    signIn: 'please, sign in or register',
    welcomeUser: 'Welcome, ',
    signOut: 'sign out',
    signInShortCaps: 'SIGN IN',
    signInRequired: 'Sign in is quick and painful, and unfortunately required for this action',
    sessionExpired: 'Sorry, your user session has expired, please sign in once again',

    networkTrouble: 'You seem to be having network difficulty, some of your actions are having trouble going through.',
    
    copyrightLine0: 'eyeofhorus.world@gmail.com',
    copyrightLine1: 'Copyright © 2017 All rights reserved',

    donateLine0: 'We are entirely supported by the general public.',
    donateLine1: 'Please donate bitcoins to:',
    donateLine2: '15ZUKotTg52QjoQY1YeV6JYUDmf4E12pzU',

    enterYourQuery: 'Find articles, attributes...',
    addAnAttribute: '+ attribute',

    openQuote: '“',
    closeQuote: '”',

    quote: 'Quote',
    attribute: 'Attribute',

    unknownId: 'xxxxxxxxxxxxxxxxxxxxxxx',

    truthful: 'truthful',

    mostRecent: 'Most Recent',

    cancel: 'cancel',
    add: 'add',
    retry: 'retry',
    search: 'search',
    cancelCaps: 'CANCEL',
    saveCaps: 'SAVE',
    retryCaps: 'RETRY',
    backCaps: 'BACK',
    showMore: 'show more',

    articleAttributeComposerWarning: 'Must have at least one attribute.',

    articleAttributeComposerErrorWhitespace: 'Should have content other than whitespace.',
    articleAttributeComposerErrorLength: 'Cannot be longer than 414 characters in content.',

    articlesLoadingError: 'There was an error loading the articles, please retry.',

    articleAttributeAddError: 'There was some problem adding the attribute, please retry.',
  },
});

export default strings;
