const IS_LOCAL_SERVER = Boolean(JSON.stringify(process.env.LOCAL_SERVER));

export default () => {
  if (IS_LOCAL_SERVER) {
    return 'http://localhost:3000';
  }

  if (process.env.NODE_ENV === 'development') {
    return 'http://127.0.0.1:8000';
  }

  if ('STAGING_BRANCH' in process.env) {
    return `https://${process.env.STAGING_BRANCH}.build.csb.dev`;
  }

  if ('ROOT_URL' in process.env) {
    return process.env.ROOT_URL;
  }

  return 'http://pib-dev.us-east-1.elasticbeanstalk.com'
  // return 'https://physicsisbeautiful.com/';
};
