'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/');
}

export default logout;
