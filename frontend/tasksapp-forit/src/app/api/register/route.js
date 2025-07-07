let users = []; //almacenamiento de ususarios en memoria

export async function POST(request) {
    const { username, password } = await request.json();

    if (!username | typeof username !== 'string') {
        return new Response(JSON.stringify({ error: "Nombre de usuario requerido"}), {
            status: 400,
        });        
    }

    if (!password | password.length < 6) {
        return new Response(JSON.stringify({ error: "La contraseña debe tener al menos 6 caracteres"}), {
            status: 400,
        });
    }

     const userExists = users.find(u => u.username === username);
     if (userExists) {
        return new Response(JSON.stringify({ error: "El usuario ya existe"}), {
            status: 409,
        });
     }

     const newUser = {
        username,
        password, // Solo para prueba. En entorno real, nunca almacenaría contraseñas en texto plano
     };

     users.push(newUser);

     return new responseCookiesToRequestCookies(JSON.stringify({ message: "Usuario registrado exitosamente" }), {
        status: 201,
     });
}