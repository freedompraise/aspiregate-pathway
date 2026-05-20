import type { RouteRecord } from "vite-react-ssg";
import RouteErrorFallback from "@/components/RouteErrorFallback";
import RootLayout from "@/RootLayout";
import { getBlogCategoryStaticPaths, getBlogPostStaticPaths } from "@/lib/blogStaticPaths";
import { lazyPage } from "@/lib/lazyRoute";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      { index: true, lazy: lazyPage(() => import("@/pages/Index")) },
      { path: "services", lazy: lazyPage(() => import("@/pages/Services")) },
      { path: "destinations", lazy: lazyPage(() => import("@/pages/Destinations")) },
      { path: "contact", lazy: lazyPage(() => import("@/pages/Contact")) },
      { path: "blog", lazy: lazyPage(() => import("@/pages/blog/BlogIndex")) },
      {
        path: "blog/category/:categorySlug",
        lazy: lazyPage(() => import("@/pages/blog/BlogCategory")),
        getStaticPaths: getBlogCategoryStaticPaths,
      },
      {
        path: "blog/:slug",
        lazy: lazyPage(() => import("@/pages/blog/BlogPost")),
        getStaticPaths: getBlogPostStaticPaths,
      },
      { path: "*", lazy: lazyPage(() => import("@/pages/NotFound")) },
    ],
  },
];
