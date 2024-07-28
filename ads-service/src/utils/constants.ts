import dotenv from "dotenv";
dotenv.config();

export const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY
export const PAYU_SALT = process.env.PAYU_SALT

export const POST_PROMOTION_PERIOD =  30

export const RABBITMQ_URL  = "amqp://rabbitmq-service.default.svc.cluster.local:5672"

// DEV:
// export const RABBITMQ_URL  = "amqp://rabbitmq:5672"
