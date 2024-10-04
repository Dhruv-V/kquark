import { z, ZodError } from "zod";

function parseConfig(data: unknown) {
  try {
    return configSchema.parse(data);
  } catch (err) {
    if (err instanceof ZodError) console.error("Invalid app configuration. Issues:", err.issues);
    else console.error("Unknown error while parsing app configuration", err);
    throw err;
  }
}

const configSchema = z
  .object({
    apiUrl: z.string().url(),
    cognito: z.object({
      region: z.string(),
      userPoolId: z.string(),
      userPoolClientId: z.string(),
    }),
  })
  .readonly();

export const config = parseConfig({
  apiUrl: process.env.EXPO_PUBLIC_API_URL,
  cognito: {
    region: process.env.EXPO_PUBLIC_COGNITO_REGION,
    userPoolId: process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID,
    userPoolClientId: process.env.EXPO_PUBLIC_COGNITO_USER_POOL_CLIENT_ID,
  },
});
