import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
 import "./styles/index.css";
import { NotFound } from "./components/NotFound";


export const links: Route.LinksFunction = () => {
  return [
    { rel: "icon", type: "image/png", href: "/ridgeform_favicon/favicon-96x96.png", sizes: "96x96" },
    { rel: "icon", type: "image/svg+xml", href: "/ridgeform_favicon/favicon.svg" },
    { rel: "shortcut icon", href: "/ridgeform_favicon/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/ridgeform_favicon/apple-touch-icon.png" },
    { rel: "manifest", href: "/ridgeform_favicon/site.webmanifest" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <NotFound />;
}
