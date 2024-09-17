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

#### 📃 Add Search (Crear nuevo registro de busqueda)

```http
POST /search/history
```

| Propiedad de Cuerpo | Tipo      | Descripción                                                  |
| ------------------- | --------- | ------------------------------------------------------------ |
| `title`             | `String`  | **Requerido**. Título de busqueda                            |
| `booleanQuery`      | `String`  | **Requerido**. Query booleana para realizar la busqueda      |
| `isBooleanSearch`   | `Boolean` | **Requerido**. Específica si el tipo de busqueda es booleano |

| Propiedad de Cabecera | Tipo           | Descripción                    |
| --------------------- | -------------- | ------------------------------ |
| `Authorization`       | `Bearer Token` | **Requerido**. Token de sesión |

###### Respuesta <mark>201 Create</mark>

```json
{
    "message": "Historial de búsqueda guardado correctamente"
}
```

###### Respuesta <mark>400 Bad Request</mark>

```json
{
    "message": "Se requiere una query de busqueda"
}
```

```json
{
    "message": "Se requiere un título para el historial de búsqueda"
}
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
    "message": "Ocurrió un error al procesar la solicitud"
}
```

---

#### 📃 List Search (Listado de busquedas)

```http
GET /search/history
```

| Parametros (Query) | Tipo       | Descripción                                                                          |
| ------------------ | ---------- | ------------------------------------------------------------------------------------ |
| `page`             | `Number`   | **Opciona**. Numero de pagina                                                        |
| `limit`            | `Number`   | **Opcional**. Cantidad de registros por pagina                                       |
| `order`            | `String`   | **Opcional**. Orden de listado en relacion al campo `date`, puede ser *ASC* o *DESC* |
| `filter`           | `String[]` | **Opcional.** Arreglo de palabras clave para filtrado. (AND)                         |
| `search`           | `String[]` | **Opcional.** Arreglo de palabras clave para busqueda. (AND)                         |
| `startDate`        | `String`   | **Opcional.** Fecha de inicio para rango de busqueda.                                |
| `endDate`          | `String`   | **Opcional.** Fecha de fin para rango de busqueda.                                   |

| Propiedad de Cabecera | Tipo           | Descripción                    |
| --------------------- | -------------- | ------------------------------ |
| `Authorization`       | `Bearer Token` | **Requerido**. Token de sesión |

###### Respuesta 200 OK

```json
{
    "data": [
        {
            "id": 1,
            "user_id": 2,
            "date": "2024-09-16T21:48:14.000Z",
            "search": "(((BBVARe_mx OR to:BBVARe_mx  OR from:BBVARe_mx OR BBVA_Mex OR to:BBVA_Mex OR from:BBVA_Mex OR BBVAPrensa_mx OR to:BBVAPrensa_mx OR from:BBVAPrensa_mx OR bbva OR to:bbva OR from:bbva) AND (\"Fundación BBVA\" OR fundacion BBVA OR fundaciónBBVA OR fundacionbbva OR \"Eduardo Osuna Osuna\" OR \"Hugo Daniel Nájera Alva\" OR \"Sofía Ize Ludlow\" OR \"Jorge Terrazas Madariaga\" OR \"Juan Arturo Rangel Mandujano\" OR \"Rafael Humberto del Río Aguirre\" OR \"Alvaro Vaqueiro Ussel\" OR \"Álvaro Vaqueiro Ussel\" OR \"Edgar Nicolás Karam Kassab\" OR \"Blanca Cecilia Muñoz Martínez\" OR \"Natalia Ortega Gómez\" OR \"Mauricio Pallares Coello\" OR \"Ignacio De la Luz Dávalos\" OR \"Alejandro Pineda Mosiño\" OR \"Jaime Lázaro Ruiz\" OR \"Jaime Serra Puche\" OR \"Adolfo Arcos González\" OR \"Enrique José Fernández Gutiérrez\" OR \"Eugenio Bernal Caso\" OR \"Guillermo Estrada Attolini\" OR \"Enrique José Cornish Staton\" OR \"Adolfo Arcos\" OR \"Adolfo Gonzalez\" OR \"Adolfo González\" OR \"Alejandro Mosiño\" OR \"Alejandro Pineda\" OR \"Alvaro Ussel\" OR \"Alvaro Vaqueiro\" OR \"ArcosGonzalez\" OR \"ArcosGonzález\" OR \"Bernal Caso\" OR \"BernalCaso\" OR \"Blanca Muñoz Martínez\" OR \"Cecilia Muñoz Martínez\" OR Coello OR Cornish OR CornishStaton OR DelaLuzDavalos OR DelaLuzDávalos OR \"Eduardo Osuna\" OR EduardoOsuna OR \"Enrique Fernández Guitérrez\" OR EstradaAttolini OR \"Eugenio Bernal\" OR \"Eugenio Caso\" OR \"Fernandez Guiterrez\" OR \"Fernandez Guitérrez\" OR \"Fernández Guiterrez\" OR \"Fernández Guitérrez\" OR \"FernandezGuiterrez\" OR \"FernandezGuitérrez\" OR \"FernándezGuiterrez\" OR \"FernándezGuitérrez\" OR \"Guillermo Attolini\" OR \"Guillermo Estrada\" OR \"Hugo Daniel Nájera\" OR \"Hugo Nájera Alva\" OR \"Ignacio Davalos\" OR \"Ignacio Dávalos\" OR \"Ignacio de la Luz\" OR IzeLudlow OR \"Jaime Lazaro\" OR \"Jaime Lázaro\" OR \"Jaime Ruiz\" OR \"Jaime Serra\" OR \"Jorge Madariaga\" OR \"Jorge Mandujano\" OR \"Jorge Rangel\" OR \"Jorge Rangel Mandujano\" OR \"Jorge Terrazas\" OR \"José Fernández Guitérrez\" OR Karam OR \"Karam Kassab\" OR KaramKassab OR Kassab OR LazaroRuiz OR \"LázaroRuiz\" OR MuñozMartinez OR \"MuñozMartínez\" OR NajeraAvila OR \"NajeraÁvila\" OR NájeraAvila OR \"NájeraÁvila\" OR \"Natalia Ortega\" OR OrtegaGomez OR \"OrtegaGómez\" OR OsunaOsuna OR Pallares OR PallaresCoello OR PinedaMosiño OR \"Rafael Aguirre\" OR \"Rafael del Río\" OR RangelMandujano OR \"Rio Aguirre\" OR \"Río Aguirre\" OR RioAguirre OR \"RíoAguirre\" OR SerraPuche OR \"Sofia Ize\" OR \"Sofía Ize\" OR \"Sofia Ludlow\" OR \"Sofía Ludlow\" OR SofiaIze OR SofíaIze OR SofiaLudlow OR SofíaLudlow OR Stanton OR TerrazasMadariaga OR Ussel OR Vaqueiro OR \"Vaqueiro Ussel\" OR VaqueiroUssel OR trimestre OR trimestral OR trimestrales OR Entrevista OR \"Banco del Bienestar\" OR \"ofrece\" OR servicio OR servicios OR Condusef OR discapacidad OR incapacidad OR \"capacidades diferentes\" OR discapacidades OR discapacitado OR discapacitada OR discrimina OR discriminar OR discriminatorio OR discriminativa OR racista OR racista OR racismos OR racismo OR clacista OR clacistas OR clasismo OR invidente OR ciego OR ciegos OR ciega OR ciegas OR \"CEO de Bancomer\" OR \"CEO de BBVA\" OR cuenta OR \"deposita\" OR depositar OR depositado OR depósito OR depósitos OR depositos OR deposito OR paga OR pago OR pagar OR pagos OR transfer OR transferencia OR transferir OR préstamo OR préstamos OR prestamo OR prestamos OR prestar OR asalto OR asaltar OR asaltos OR asaltantes OR asaltante OR atraco OR atracos OR atracar OR atraca OR robo OR robos OR ratero OR rateros OR nómina OR nomina OR nóminas OR hipoteca OR hipotecas OR \"te atiende\")) AND NOT (\"el BBVA\" OR \"estadio BBVA\" OR \"al BBVA\" OR \"Liga Bancomer\" OR \"Liga BBVA\" OR LigaBBVA OR LigaBancomer OR \"Liga MX\" OR LigaMX OR \"clasico regio\" OR \"clásico regio\" OR \"canal privado\" OR telegram OR onlyfans OR \"only fans\" OR \"mi of\" OR \"el of\" OR dona OR apadrina OR perrito OR patita OR croquetas OR antepata OR BTS OR preventa OR \"pre venta\" OR TDC OR XXX OR gay OR chacal OR pack OR foto OR video OR hot OR leche OR apple OR tributo OR queja OR quejas OR quejar OR quejarse OR \"banca en linea\" OR \"banca en línea\" OR bancadigital OR torneo OR futbol OR fútbol OR euros OR euro OR animal OR perro OR perros OR gato OR gatos OR mascota OR reclamo OR reclamar OR reclamación OR reclamacion OR reclamaciones OR aclarar OR aclaración OR aclaracion OR aclaraciones OR queja OR pinche OR mierda OR mierdas OR \"en la madre\" OR porquería OR porqueria OR porquerías OR porquerias OR carajo OR csm OR ctpm OR chinga OR chingas OR chingada OR cabrón OR cabron OR cabrona OR pendejo OR pendeja OR pendejada OR puto OR puta OR mamada OR mamadas OR puñetera OR puñetas OR pésima OR pésima OR mala OR horrible OR terrible OR fraude OR \"sin servicio\" OR hack OR ciberataque OR clonar OR clonación OR \"no sirve\" OR \"no funciona\" OR \"no jala\" OR falla OR fallas OR problema OR problemas OR \"no está funcionando\" OR verga OR \"no deja\" OR caído OR caída OR caido OR caída OR \"sin poder\" OR \"no me deja\" OR peor OR peores OR lento OR intermitencia OR intermitente OR barzón OR barzon OR oxxo OR \"cuenta BBVA\" OR \"BBVA cuenta\" OR \"Banco: BBVA\"))",
            "is_boolean_search": 1,
            "title": "BBVA Search",
            "fullname": "Juan Sterren"
        }
    ],
    "totalResults": 1
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
