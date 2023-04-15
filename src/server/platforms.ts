import Twit from "twit";
import { env } from "~/env.mjs";

type TwitterClientConfig = {
  access_token: string;
  access_token_secret: string;
};

export const createTwitterClient = (config: TwitterClientConfig) => {
  return new Twit({
    consumer_key: env.TWITTER_CLIENT_ID,
    consumer_secret: env.TWITTER_CLIENT_SECRET,
    ...config,
  });
};
