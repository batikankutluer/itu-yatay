import App from "./page-client";

export default async function Home() {
  const version: string = "v1.0.5";
  return <App version={version} />;
}
