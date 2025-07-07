let users = [{ username: 'admin', password: '1234' }];

import { createJWT } from '@/lib/jwt';

export async function POST(request) {
    const { username, password } = await request.json();

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return new Response(JSON.stringify({ error: "Credenciales invalidas"}), {
            status: 401,            
        });
    }

    const token = await createJWT({ username: user.username });

    return Response.json({ access: token });
}