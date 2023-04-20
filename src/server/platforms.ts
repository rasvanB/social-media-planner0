import Twit from "twit";
import { z } from "zod";
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

const dataSchema = z.object({
  media_id_string: z.string(),
});

export class TwitterClient {
  client: Twit;

  constructor(config: TwitterClientConfig) {
    this.client = createTwitterClient(config);
  }

  postImagePost(content: string, b64content: string | Buffer) {
    this.client.post(
      "/media/upload",
      {
        media_data: b64content,
      },
      (err, data, _response) => {
        if (err) {
          console.log("ERROR:", err);
          return;
        }
        const res = dataSchema.safeParse(data);
        if (!res.success) {
          console.log("ERROR:", res.error);
          return;
        }
        const mediaIdStr = res.data.media_id_string;
        const meta_params = { media_id: mediaIdStr };
        this.client.post(
          "/media/metadata/create",
          meta_params,
          (err, _data, _response) => {
            if (!err) {
              const params = { status: content, media_ids: [mediaIdStr] };
              this.client.post(
                "statuses/update",
                params,
                (err, data, _response) => {
                  if (err) {
                    console.log("ERROR:", err);
                    return;
                  }
                  console.log("SUCCESS:", data);
                }
              );
            }
          }
        );
      }
    );
  }
}
