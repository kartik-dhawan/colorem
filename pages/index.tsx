import Head from "next/head";

export default function Home() {
  return (
    <div className="indexWrapper">
      <Head>
        <title>Colorem</title>
        <meta name="description" content="The permutations of colors." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="indexMain">
        <h1 className="indexHeader">
          Creating our own <a href="/dashboard">Colorem</a>
        </h1>
      </main>
    </div>
  );
}
