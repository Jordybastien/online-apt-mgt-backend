import dotenv from 'dotenv';
import redis from 'redis';

dotenv.config();

const redisClient = redis.createClient(process.env.REDIS_URL);

export default redisClient;
