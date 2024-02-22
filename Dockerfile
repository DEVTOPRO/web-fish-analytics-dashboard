FROM node:20

WORKDIR /appdock

COPY . .

RUN npm install --force && npm run build

EXPOSE 3000

CMD ["npm", "start"]


# Stage 2 - the production environment
# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY /build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]