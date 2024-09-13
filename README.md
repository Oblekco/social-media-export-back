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

-----

## API's

#### 🛡 Logín (Inicio de sesión)

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

###### Respuesta <mark>500 Internal Server Error</mark>

```json
{
    "message": "Ocurrio un error al autenticar usuario"
}
```

```json
{
    "message": "Error interno del servidor"
}
```

----

#### 🔍 Search (Busqueda de datos)

```http
POST /search
```

| Propiedad de Cuerpo | Tipo     | Descripción                                          |
| ------------------- | -------- | ---------------------------------------------------- |
| `dateStart`         | `String` | **Requerido**. Fecha de inicio de busqueda           |
| `dateEnd`           | `String` | **Requerido**. Fecha de fin de busqueda              |
| `booleanQuery`      | `String` | **Requerido**. Query booleana para realizar busqueda |

| Propiedad de Cabecera | Tipo           | Descripción                    |
| --------------------- | -------------- | ------------------------------ |
| `Authorization`       | `Bearer Token` | **Requerido**. Token de sesión |

###### Respuesta <mark>200 OK</mark>

```json
{
    "socialData": [
        {
            "date": "2023-10-01",
            "headline": "Sample Headline 1",
            "url": "http://example.com/1",
            "openingText": "This is the opening text for sample 1.",
            "hitSentence": "This is a hit sentence for sample 1.",
            "source": "Source 1",
            "influencer": "Influencer 1",
            "country": "Country 1",
            "reach": 1000,
            "engagement": 100,
            "sentiment": "Positive",
            "keyPhrases": "key1, key2",
            "inputName": "Input 1",
            "twitterScreenName": "@sample1",
            "twitterFollowers": 500,
            "twitterFollowing": 100,
            "state": "State 1",
            "city": "City 1",
            "views": 200,
            "likes": 50,
            "replies": 10,
            "retweets": 5,
            "comments": 20,
            "shares": 15,
            "reactions": 30,
            "threads": 2
        },
        {
            "date": "2023-10-02",
            "headline": "Sample Headline 2",
            "url": "http://example.com/2",
            "openingText": "This is the opening text for sample 2.",
            "hitSentence": "This is a hit sentence for sample 2.",
            "source": "Source 2",
            "influencer": "Influencer 2",
            "country": "Country 2",
            "reach": 2000,
            "engagement": 200,
            "sentiment": "Neutral",
            "keyPhrases": "key3, key4",
            "inputName": "Input 2",
            "twitterScreenName": "@sample2",
            "twitterFollowers": 1000,
            "twitterFollowing": 200,
            "state": "State 2",
            "city": "City 2",
            "views": 400,
            "likes": 100,
            "replies": 20,
            "retweets": 10,
            "comments": 40,
            "shares": 30,
            "reactions": 60,
            "threads": 4
        }
    ],
    "filePath": "docs/smd-20240905152057.xlsx"
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
    "message": "La query de busqueda es necesaria"
}
```

###### Respuesta <mark>500 Internal Server Error</mark>

```json
{
    "message": "Ocurrio un error al guardar el historial"
}
```

```json
{
    "message": "Ocurrio un error al obtener los registros"
}
```

```json
{
    "message": "Ocurrio un error al procesar la solicitud"
}
```

--------

#### 📃 List Search (Listado de busquedas)

```http
GET /search
```

| Parametros (Query) | Tipo       | Descripción                                                                          |
| ------------------ | ---------- | ------------------------------------------------------------------------------------ |
| `page`             | `Number`   | **Opciona**. Numero de pagina                                                        |
| `limit`            | `Number`   | **Opcional**. Cantidad de registros por pagina                                       |
| `order`            | `String`   | **Opcional**. Orden de listado en relacion al campo `date`, puede ser *ASC* o *DESC* |
| `filter`           | `String[]` | **Opcional.** Arreglo de palabras clave para busqueda. (AND)                         |

| Propiedad de Cabecera | Tipo           | Descripción                    |
| --------------------- | -------------- | ------------------------------ |
| `Authorization`       | `Bearer Token` | **Requerido**. Token de sesión |

###### Respuesta <mark>200 OK</mark>

```json
[
    {
        "id": 1,
        "user_id": 2,
        "date": "2024-09-06T00:07:20.000Z",
        "search": "(((BBVARe_mx OR to:BBVARe_mx  OR from:BBVARe_mx OR BBVA_Mex OR to:BBVA_Mex OR from:BBVA_Mex OR BBVAPrensa_mx"))",
        "is_boolean_search": 1
    }
]
```

###### Respuesta <mark>401 Unauthorized</mark>

```json
{
    "message": "Credenciales incorrectas"
}
```

###### Respuesta<mark> 500 Internal Server Erro</mark>r

```json
{
    "message": "Ocurrió un error al obtener el historial de busqueda"
}
```

---

#### 📨 Send Email (Enviar email con archivo .xlsx adjunto)

```http
POST /send
```

| Propiedad de Cuerpo | Tipo     | Descripción                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| `filePath`          | `String` | **Requerido**. FilePath donde se encuentra alojado el .xlsx previamente |

| Propiedad de Cabecera | Tipo           | Descripción                    |
| --------------------- | -------------- | ------------------------------ |
| `Authorization`       | `Bearer Token` | **Requerido**. Token de sesión |

###### Respuesta <mark>200 OK</mark>

```json
{
    "message": "Datos enviados correctamente."
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
    "message": "Se requiere la ruta del archivo."
}
```

###### Respuesta <mark>500 Internal Server Error</mark>

```json
{
    "message": "El usuario no tiene un correo electrónico asociado"
}
```

```json
{
    "message": "Ocurrió un error al enviar el correo electrónico"
}
```

----

#### 🗑 File Remove (Eliminar archivo previamente generado)

```http
DELETE /file/remove
```

| Propiedad de Cuerpo | Tipo     | Descripción                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| `filePath`          | `String` | **Requerido**. FilePath donde se encuentra alojado el .xlsx previamente |

| Propiedad de Cabecera | Tipo           | Descripción                    |
| --------------------- | -------------- | ------------------------------ |
| `Authorization`       | `Bearer Token` | **Requerido**. Token de sesión |

###### Respuesta <mark>200 OK</mark>

```json
{
    "message": "Archivo eliminado correctamente"
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
    "message": "Se requiere la ruta del archivo"
}
```

###### Respuesta <mark>404 Not Found</mark>

```json
{
    "message": "Archivo no encontrado"
}
```

###### Respuesta <mark>500 Internal Server Error</mark>

```json
{
    "message": "Ocurrió un error al intentar eliminar el archivo"
}
```

---

## Extras

#### ⏰️ Función Cronada (Eliminación masiva de archivos)

> Este proyecton dispone de una función cronada que se inicia a las 00:00 de cada día eliminando los archivos que hayan sido creado desde las 00:01 hasta las 23:00 del dia anterior.

-------

## Proyecto Relacionado

Este proyecto es el backend de la aplicacion **Social Media Exporter** para correr la aplicacion completa en local podes dirigirte al frontend en el siguiente enlace

[**Ir al Front**](https://github.com/Oblekco/social-media-export-front)

## Soporte

Ante cualquier consulta podes enviar un email a *juanignacio.sterren@intelicast.net*.
