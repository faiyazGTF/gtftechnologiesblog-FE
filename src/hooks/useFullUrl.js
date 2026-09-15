import { useRouter } from "next/router";
import { useMemo } from "react";

const useFullUrl = () => {
  const router = useRouter();

  const fullUrl = useMemo(() => {
    // Avoid returning an unreliable path before dynamic route params are resolved
    if (!router.isReady) {
      return "";
    }

    // Strip hash fragments — canonical/OG URLs shouldn't include them
    const path = router.asPath.split("#")[0];

    if (typeof window !== "undefined") {
      return `${window.location.origin}${path}`;
    }

    // Fallback for SSR — normalize trailing slash to avoid double slashes
    const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
    return `${base}${path}`;
  }, [router.asPath, router.isReady]);

  return fullUrl;
};

export default useFullUrl;