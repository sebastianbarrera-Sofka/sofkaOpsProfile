
FROM node-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

# Etapa de producción
FROM nginx:alpine
COPY --from=build /app/dist/fnt_sofka_opsprofiler /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

