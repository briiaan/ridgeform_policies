import type { Route } from "./+types/home";
import App from "../components/App";
import { useLoaderData } from "react-router";
import type { Tab } from "../components/App";
import { NotFound } from "../components/NotFound";

export function meta() {
  return [
    { title: "Policies | Ridgeform Construction" },
    { name: "description", content: "View the policies of Ridgeform Construction." },
  ];
}

export async function loader({params}: {params : Record<string, string | undefined>}) {
  // sanitize tab param
  const validTabs: Tab[] = ["privacy", "terms", "cookies"];

  const tabParam: string = params.tab?.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  if (!tabParam) {
    return { tab: "privacy" }; // no tab provided
  }
  // if invalid, default to 'privacy'
  if (validTabs.includes(tabParam as Tab)) {
    return { tab: tabParam as Tab }; // invalid tab
  }
  // return as Tab type
  return { tab : null };
}

export default function Home() {
  // returns tab from loader
  const { tab } = useLoaderData();

  if (tab === null) {
    // render NotFound if tab is invalid
    return <NotFound />;
  }

  // render App with tab prop
  return <>
  <App tab={tab} />
  </>;
}
