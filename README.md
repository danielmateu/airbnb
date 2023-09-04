# Airbnb Clone

![Logo](https://my-places-chi.vercel.app/images/logo.png)

3. [Instalación](#instalación)
4. [Configuración](#configuración)
5. [Uso](#uso)
6. [Contribución](#contribución)
7. [Licencia](#licencia)

## Introducción

Bienvenido a un viaje en el que he explorado las complejidades y desafíos detrás de la creación de un clon de Airbnb, una plataforma de reserva de alojamientos líder en la industria. En este proyecto, he combinado una selección de tecnologías de vanguardia y enfoques de desarrollo para ofrecer una experiencia de usuario inigualable y escalable.

Este clon de Airbnb no solo es un ejercicio en la replicación de una interfaz popular, sino también una demostración de cómo aplicar tecnologías modernas en un entorno de desarrollo real. A continuación, destacamos algunas de las tecnologías clave que impulsan este proyecto:

## Tecnologías

- [Next.js](https://nextjs.org/): Utilizamos Next.js como nuestro framework principal de React para la creación de aplicaciones web del lado del cliente y del servidor. La renderización del lado del servidor mejora la velocidad de carga y la experiencia del usuario.
- [TypeScript](https://www.typescriptlang.org/): Hemos optado por TypeScript para mantener nuestro código más seguro y legible, al agregar tipos estáticos a JavaScript.
- [Zustand](https://github.com/pmndrs/zustand): La gestión de estado es fundamental en una aplicación web compleja como esta. Zustand, una biblioteca de gestión de estado ligera para React, nos permite gestionar eficazmente el estado de la aplicación.
- [Cloudinary](https://cloudinary.com/): Servicio de gestión de imágenes en la nube.
- [Tailwind CSS](https://tailwindcss.com/): Tailwind CSS es nuestro aliado en la creación de una interfaz de usuario atractiva y altamente personalizable. Su enfoque de diseño utilitario facilita la creación de componentes y estilos coherentes.
- [Axios](https://axios-http.com/): Cliente HTTP para realizar solicitudes a API.
- [Prisma](https://www.prisma.io/): Como ORM, Prisma nos permite interactuar de manera eficiente con nuestra base de datos MongoDB. Definir modelos de datos y realizar operaciones CRUD se simplifica considerablemente.
- [MongoDB](https://www.mongodb.com/): He optado por MongoDB como nuestra base de datos NoSQL debido a su flexibilidad y escalabilidad. Almacenamos datos críticos como detalles de propiedad, usuarios y reservas.
- [OAuth]: Implementamos el flujo de autenticación OAuth para garantizar un proceso de inicio de sesión seguro y eficaz. Esto permite a los usuarios autenticarse de manera segura a través de servicios de terceros.

## Instalación

Asegúrate de tener Node.js y npm (o yarn) instalados en tu sistema.

1. Clona este repositorio:

   ```bash
   git clone https://github.com/danielmateu/airbnb

   ```

2. Navega al directorio del proyecto:

   ```bash
   cd tuproyecto

   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configuración:

Antes de poder usar la aplicación, necesitas configurar algunos parámetros. Crea un archivo .env.local en la raíz del proyecto y agrega las siguientes variables de entorno:

DATABASE_URL=""

NEXTAUTH_SECRET=""

NEXTAUTH_URL=http://localhost:3000

GITHUB_CLIENT_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""

Asegúrate de reemplazar DATABASE_URL, NEXTAUTH_SECRET, etc., con tus propias credenciales y valores de configuración.

5. Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

```bash
Crea una bifurcación (fork) del repositorio en GitHub.
Clona tu repositorio bifurcado localmente.
Crea una rama (branch) para tus cambios.
Realiza tus cambios y confirma (commit) tus contribuciones.
Envía una solicitud de extracción (pull request) a la rama principal del proyecto.
```

6. Referencias!

youtube -> https://www.youtube.com/watch?v=c_-b_isI4vg
github -> https://github.com/AntonioErdeljac/next13-airbnb-clone
