export async function PUT(request, { params }) {
  const id = parseInt(params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return new Response(JSON.stringify({ error: 'Tarea no encontrada' }), {
      status: 404,
    });
  }

  const data = await request.json();
  tasks[index] = { ...tasks[index], ...data };

  return Response.json(tasks[index]);
}

export async function DELETE(_, { params }) {
  const id = parseInt(params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return new Response(JSON.stringify({ error: 'Tarea no encontrada' }), {
      status: 404,
    });
  }

  const deleted = tasks.splice(index, 1)[0];
  return Response.json(deleted);
}
