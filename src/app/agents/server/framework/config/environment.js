/* eslint-disable no-console */

const isDevelopmentEnvironment = () => process.env.NODE_ENV === 'development';

export default isDevelopmentEnvironment;

export const isTestingEnvironment = () => !!(process.env.TEST === 'true');

export const isStagingEnvironment = () => !!(process.env.STAGING === 'true');
