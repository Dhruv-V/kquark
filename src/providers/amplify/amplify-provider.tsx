import { config } from "@/config";
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: "ap-south-1",
    userPoolId: "ap-south-1_ZRi9hdUXe",
    userPoolWebClientId: "6vuqisgkdp4h6pol1gkc4qffb8",
  },
});

export function AmplifyProvider(props: { children: React.ReactNode }) {
  return <>{props.children}</>;
}
