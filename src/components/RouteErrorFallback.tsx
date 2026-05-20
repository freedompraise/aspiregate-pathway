import { useRouteError } from "react-router-dom";
import { isChunkLoadError } from "@/lib/chunkLoadError";

const RouteErrorFallback = () => {
  const error = useRouteError();
  const staleBundle = isChunkLoadError(error);

  return (
    <main className="min-h-screen bg-background px-6 py-20">
      <div className="mx-auto max-w-md text-center font-sans">
        <p className="text-[15px] leading-6 text-foreground/80">
          {staleBundle ? (
            <>
              Ooops, this page didn&apos;t load properly. Try reloading to pick up the latest
              version of the site.
            </>
          ) : (
            <>Something went wrong while loading this page. Try reloading — that often fixes it.</>
          )}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-5 text-[15px] text-foreground underline decoration-foreground/40 underline-offset-2 hover:decoration-foreground"
        >
          Reload
        </button>
      </div>
    </main>
  );
};

export default RouteErrorFallback;
