# Reto técnico INDRA

## Descripción del reto técnico:

- Crear una API en Node.js con el framework Serverless para un despliegue en AWS.
- Adaptar y transformar los modelos de la API de prueba. Se tienen que mapear todos los nombres de atributos modelos del inglés al español (Ej: name -> nombre).
- Integrar la API de prueba StarWars API (líneas abajo está el link) se deben integrar uno o más endpoints.
- Crear un modelo de su elección mediante el uso de un endpoint POST, la data se tendrá que almacenar dentro de una base de datos.
- Crear un endpoint GET que muestre la data almacenada. 

### Tecnologías Utilizadas

- Backend: NodeJS Typescript
- BD relacional: MySQL
- Serverless framework
- Test: Jest Typescript

## Uso

Antes que nada clone el repositorio con `git clone` en su computadora o equipo de trabajo.

### Instalar nodejs y serverless framwork

- Instale nodejs de acuerdo a su sistema operaivo. La versión utilizada para esta prueba: 18.19.1. [https://nodejs.org/en/download/current](https://nodejs.org/en/download/current)
- Instale Serverless Framework en su sistema. `npm install -g serverless`

### Instalar dependencias

```bash
$ cd indra-aws-nodejs-sls-api
$ yarn ó npm install
```

### Instalación de MySQL:

Este proyecto usa `mysql` como base de datos. Asegúrate de tenerlo instalado en su entorno de desarrollo. Esta aplicación se conectará usando los parámetros por defecto de `mysql`.

#### Creación del archivo .env:

Debes crear en la raíz del proyecto un archivo llamado `.env` para la configuración de variables de entorno.

#### Variables de entorno para a base de datos:

Recuerde cambiar el valor de cada variable por el correspondiente a su entorno.

```bash
# .env
DB_HOST=127.0.0.1
DB_DATABASE=database_name
DB_USER=root
DB_PASSWORD=
DB_PORT=3306
```

#### Importación del script SQL:

Por otro lado, se requiere importar la tabla utilizada para el reto llamada `bicycles` como ejemplo de las pruebas. Este archivo se encuentra en el directorio `sql` de este repositorio.

### Integración con SWAPI:

Como parte de la prueba, se requiere integración con la API de [SWAPI](https://swapi.py4e.com/). Por lo que es necesario configurar la variable de entorno `SWAPI_URL` en el archivo `.env`.

```bash
# .env
SWAPI_URL=https://swapi.py4e.com/api
```

### Ejecutando la aplicación

Una vez instaladas todas las dependencias ejecute los siguientes comandos:

#### Ejecute los test para validar que todo va como debe:

```bash
yarn run test
# ó
npm run test
```

#### Ejecute la aplicación localmente (modo offline):

Esto levantará un servidor local que simulará en entorno de API Gateway Service.

```bash
sls offline
```

#### Desplegar la aplicación en la nube:

```bash
yarn run deploy
```