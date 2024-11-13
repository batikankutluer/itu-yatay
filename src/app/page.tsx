import App from "./page-client";

export default async function Home() {
  let version: string = process.env.VERSION as string;
  return <App version={version} />;
}
