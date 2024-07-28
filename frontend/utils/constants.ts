export const PayU = {
  merchantKey: 'PMd9OW',
};

//  /* PROD: 
export const FRONTEND_DOMAIN = "https://wenet.life";

const DOMAIN = "https://wenet.life";

const USER_SERVICE_DOMAIN = DOMAIN;
const POSTS_SERVICE_DOMAIN = DOMAIN;
const MESSAGE_SERVICE_DOMAIN = DOMAIN;
const NOTIFICATION_SERVICE_DOMAIN = DOMAIN;
const ADS_SERVICE_DOMAIN = DOMAIN;
// /* 

/* DEV:
export const FRONTEND_DOMAIN = 'http://localhost:3000';

const USER_SERVICE_DOMAIN = 'http://localhost:5001';
const POSTS_SERVICE_DOMAIN = 'http://localhost:5002';
const MESSAGE_SERVICE_DOMAIN = 'http://localhost:5003';
const NOTIFICATION_SERVICE_DOMAIN = 'http://localhost:5004';
const ADS_SERVICE_DOMAIN = 'http://localhost:5004';
*/

export const USER_SERVICE_URL = `${USER_SERVICE_DOMAIN}/api/user-service`;
export const POSTS_SERVICE_URL = `${POSTS_SERVICE_DOMAIN}/api/posts-service`;
export const MESSAGE_SERVICE_URL = `${MESSAGE_SERVICE_DOMAIN}/api/message-service`;
export const NOTIFICATION_SERVICE_URL = `${NOTIFICATION_SERVICE_DOMAIN}/api/notification-service`;
export const ADS_SERVICE_URL = `${ADS_SERVICE_DOMAIN}/api/ads-service`;

export const SOCKET_URI = MESSAGE_SERVICE_DOMAIN;

export const GOOGLE_CLIENT_ID =
  "404291875462-ko7on4mhdb6bslaabtn3tgb3oko5nvac.apps.googleusercontent.com";

export const JWT_SECRET =process.env.JWT_SECRET