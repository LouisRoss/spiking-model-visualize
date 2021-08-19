FROM node:15.14

LABEL version="1.0"
LABEL description="This is the base docker image for the Spiking Neural Network Visualizer."
LABEL maintainer = "Louis Ross <louis.ross@gmail.com"

WORKDIR /app

COPY ["package.json", "package-lock.json", "/app/"]
RUN ls
#RUN npm install --production
RUN npm install -g npm@7.20.1
RUN npm install

COPY . .

EXPOSE 8080

CMD ./node_modules/http-server/bin/http-server . -p 3000
