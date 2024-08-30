![Logo](https://media.licdn.com/dms/image/v2/C4E1BAQGorTTcdBpzbg/company-background_10000/company-background_10000/0/1624981679246/oblek_company_cover?e=2147483647&v=beta&t=jESdkfCgLdymZj4KUdeqydqj1ZTctI8T4yrNzU6JMaY)

# 💾 Social Media Exporter

Este proyecto es un exportador XLSX de información de redes sociales.

## Stack Tecnológico y Dependencias

**Server:** Node, Express, TypeScript, Nodemailer, MySQL2, DotEnv, ExcelJS

## Variables de Entorno

Para ejecutar este proyecto, deberá agregar las siguientes variables de entorno a su archivo .env

`DB_HOST`

`DB_PORT`

`DB_USER`

`DB_PASSWORD`

`DB_NAME`

`PORT`

`SECRET`

`NODEMAILER_USER`

`NODEMAILER_PASS`

`CORS_ORIGIN`

## Ejecución en Local

Clonación del proyecto

```bash
git clone git@github.com:Oblekco/social-media-export-back.git
```

```bash
cd social-media-export-back
```

Instalar dependencias

```bash
npm install
```

Ejecutar servidor

```bash
npm run dev
```

## API's

#### Logín (Inicio de sesión)

```http
POST /auth/login
```

| Propiedad de Cuerpo | Tipo     | Descripción                          |
| ------------------- | -------- | ------------------------------------ |
| `email`             | `string` | **Requerido**. Email de usuario      |
| `password`          | `email`  | **Requerido**. Contraseña de usuario |

###### Respuesta <mark>200 OK</mark>

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI0ODc1MTU2fQ.QgLxkb8f7FMSH2ZDbiQQ7ifwsYDi2TTJREy4lSTE9I8"
}
```

###### Respuesta <mark>401 Unauthorized</mark>

```json
{
    "message": "Credenciales incorrectas"
}
```

```json
{
    "message": "Credenciales incorrectas"
}
```

###### Respuesta <mark>500 Internal Server Error</mark>

```json
{
    "message": "Ocurrió un error al enviar el correo electrónico"
}
```

#### Exporter (Exportación de datos)

```http
POST /social/export/xlsx
```

| Propiedad de Cuerpo | Tipo       | Descripción                                  |
| ------------------- | ---------- | -------------------------------------------- |
| `startDate`         | `String`   | **Requerido**. Fecha de inicio de busqueda   |
| `endDate`           | `String`   | **Requerido**. Fecha de fin de busqueda      |
| `words`             | `String[]` | **Requerido**. Palabras claves para busqueda |

| Propiedad de Cabecera | Tipo           | Descripción                    |
| --------------------- | -------------- | ------------------------------ |
| `Authorization`       | `Bearer Token` | **Requerido**. Token de sesión |

###### Respuesta <mark>200 OK</mark>

```json
{
    "message": "Datos exportados correctamente"
}
```

###### Respuesta <mark>401 Unauthorized</mark>

```json
{
    "message": "Credenciales incorrectas"
}
```

###### Respuesta <mark>400 Bad Request</mark>

```json
{
    "message": "Se requiere una fecha de inicio y una fecha de fin"
}
```

```json
{
    "message": "La fecha de inicio no puede ser mayor a la fecha de fin"
}
```

```json
{
    "message": "Las palabras clave deben ser un arreglo"
}
```

###### Respuesta <mark>500 Internal Server Error</mark>

```json
{
    "message": "Ocurrió un error al enviar el correo electrónico"
}
```

```json
{
    "message": "Ocurrió un error al procesar la solicitud"
}
```

```json
{
    "message": "Error interno del servidor"
}
```

## Proyecto Relacionado

Este proyecto es el backend de la aplicacion **Social Media Exporter** para correr la aplicacion completa en local podes dirigirte al frontend en el siguiente enlace

[**Ir al Front**](https://github.com/Oblekco/social-media-export-front)

## Soporte

Ante cualquier consulta podes enviar un email a *juanignacio.sterren@intelicast.net*.
