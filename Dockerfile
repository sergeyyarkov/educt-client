ARG NODE_IMAGE=node:14.17.3-alpine3.11
ARG NGINX_IMAGE=nginx:1.16.0-alpine

FROM ${NODE_IMAGE} as builder
WORKDIR /home/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM ${NGINX_IMAGE} as production
WORKDIR /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /home/app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]