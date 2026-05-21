import { RedirectingScreen } from "@/components/redirect/redirecting-screen";
import { getAuthCallbackUrl } from "@/lib/auth-redirect";

export async function AuthRedirect() {
  const { url, name } = await getAuthCallbackUrl();
  return <RedirectingScreen url={url} name={name} />;
}
