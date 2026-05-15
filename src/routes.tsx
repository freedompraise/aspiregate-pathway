import type { ComponentType } from "react";
import type { RouteRecord } from "vite-react-ssg";
import RootLayout from "@/RootLayout";
import { getBlogCategoryStaticPaths, getBlogPostStaticPaths } from "@/lib/blogStaticPaths";

const withDefault = (importer: () => Promise<{ default: ComponentType<object> }>) =>
  importer().then((m) => ({ Component: m.default }));

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, lazy: () => withDefault(() => import("@/pages/Index")) },
      { path: "services", lazy: () => withDefault(() => import("@/pages/Services")) },
      { path: "destinations", lazy: () => withDefault(() => import("@/pages/Destinations")) },
      { path: "contact", lazy: () => withDefault(() => import("@/pages/Contact")) },
      { path: "blog", lazy: () => withDefault(() => import("@/pages/blog/BlogIndex")) },
      {
        path: "blog/category/:categorySlug",
        lazy: () => withDefault(() => import("@/pages/blog/BlogCategory")),
        getStaticPaths: getBlogCategoryStaticPaths,
      },
      {
        path: "blog/:slug",
        lazy: () => withDefault(() => import("@/pages/blog/BlogPost")),
        getStaticPaths: getBlogPostStaticPaths,
      },
      { path: "*", lazy: () => withDefault(() => import("@/pages/NotFound")) },
    ],
  },
];
