<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```bash
yarn install
```
3. Tener Nest CLI instalado
```bash
npm i -g @nestjs/cli
```
4. Clonar el archivo `.env.template` y renombrarlo a `.env`

5. Configurar las variables de entorno en el archivo `.env`
```
MONGODB=mongodb://localhost:27017/nest-pokemon
PORT=3000
DEFAULT_LIMIT=7
```

6. Levantar la base de datos
```bash
docker compose up -d
```
7. Ejecutar la aplicación en desarrollo
```bash
yarn start:dev
```
8. Reconstruir la base de datos con el seed
```
http://localhost:3000/api/v2/seed
```

## Stack usado
- MongoDB
- Nest

---

# Ejecutar en producción con Docker

1. Clonar el archivo `.env.template` y renombrarlo a `.env.prod`

2. Configurar las variables de entorno en el archivo `.env.prod`
```
MONGODB=mongodb://mongo-poke:27017/nest-pokemon
PORT=3000
DEFAULT_LIMIT=10
```

3. Construir y levantar los contenedores
```bash
docker compose -f docker-compose.prod.yaml --env-file .env.prod up --build -d
```

4. Reconstruir la base de datos con el seed
```
http://localhost:3000/api/v2/seed
```

## Comandos útiles de Docker

```bash
# Ver contenedores corriendo
docker ps

# Ver logs de la aplicación
docker logs pokedexapp

# Detener los contenedores
docker compose -f docker-compose.prod.yaml down

# Reconstruir la imagen (después de cambios en el código)
docker compose -f docker-compose.prod.yaml --env-file .env.prod up --build -d
```

## Conexión a MongoDB desde cliente local

Para conectarte a la base de datos desde un cliente como MongoDB Compass o Studio 3T:
```
mongodb://localhost:27017/nest-pokemon
```

**Nota:** Dentro de Docker, la app usa `mongodb://mongo-poke:27017` (nombre del contenedor).

