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

| Body Property | Type     | Description                          |
|:------------- |:-------- |:------------------------------------ |
| `email`       | `string` | **Requerido**. Email de usuario      |
| `password`    | `email`  | **Requerido**. Contraseña de usuario |

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

## Proyecto Relacionado

Este proyecto es el backend de la aplicacion **Social Media Exporter** para correr la aplicacion completa en local podes dirigirte al frontend en el siguiente enlace

[**Ir al Front**](https://github.com/Oblekco/social-media-export-front)

## Soporte

Ante cualquier consulta podes enviar un email a *juanignacio.sterren@intelicast.net*.
