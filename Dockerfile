FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar código fuente
COPY server.js .
COPY tests ./tests

# Exponer puerto
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]
