# Étape 1 : build
FROM node:18 AS build
WORKDIR /app
COPY . .

ARG VITE_BACKEND_URL
ARG VITE_BACKEND_PORT
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_BACKEND_PORT=${VITE_BACKEND_PORT}

RUN npm install
RUN npm run build

# Étape 2 : image NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]