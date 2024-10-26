import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const cookieStore = cookies();

  const body = await req.json();
  const { hash, ...userData } = body;

  cookieStore.set({
    name: 'user',
    value: JSON.stringify(body),
    maxAge: 2592000,
  });

  return new Response(null, {
    status: 200,
  });
}
