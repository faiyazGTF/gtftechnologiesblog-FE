import { useRouter } from "next/router";
import { useMemo } from "react";

const useFullUrl = () => {
  const router = useRouter();

  const fullUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${router.asPath}`;
    }

    // fallback for SSR (use env)
    return `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;
  }, [router.asPath]);

  return fullUrl;
};

export default useFullUrl;