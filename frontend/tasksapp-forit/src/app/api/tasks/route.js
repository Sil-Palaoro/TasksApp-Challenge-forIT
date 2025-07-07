import { verifyJWT } from '@/lib/jwt';

//Simulación BD. Array guardado en memoria
let tasks = []; 
let currentId = 1;

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  const user = await verifyJWT(token);

  if (!user) {
    return new Response(JSON.stringify({ error: "Token invalido" }), {
      status: 401,
    });
  }

  return Response.json(tasks);
}

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  const user = await verifyJWT(token);

  if (!user) {
    return new Response(JSON.stringify({ error: "Token inválido" }), {
      status: 403,
    });
  }

  const data = await request.json();

  if (!data.title || typeof data.title !== 'string') {
    return new Response(JSON.stringify({ error: 'Título requerido' }), {
      status: 400,
    });
  }

  if (!data.description || typeof data.description !== 'string') {
    return new Response(JSON.stringify({ error: 'Descripción requerida' }), {
      status: 400,
    });
  }

  const newTask = {
    id: currentId++,
    title: data.title,
    description: data.description?.trim() || '',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: user.username,
  };

  tasks.push(newTask);

  return Response.json(newTask, { status: 201 });
}
