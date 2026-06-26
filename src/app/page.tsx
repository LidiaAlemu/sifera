import { testConnection } from "@/actions/testConnection";

export default async function Home() {
  const result = await testConnection();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-serif">Supabase Connection Test</h1>
      <pre className="mt-4 p-4 bg-white rounded">
        {JSON.stringify(result, null, 2)}
      </pre>
    </main>
  );
}