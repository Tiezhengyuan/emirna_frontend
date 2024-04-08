# front_end

### run front end (Vue JS) locally

```
sudo apt-get install -y yarn
cd emirna_frontend
yarn serve
```
Access user interface at browser, namely Chrome, at http://localhost:8080/


## Project setup
```
yarn install
```

update npm and node
```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Dockerize

### load docker container locally
build Docker image locally
```
cd emirna_frontend
docker build -t emirna-frontend .
```

run the app in a Docker container. We should be able to access our Vue.js app on localhost:8081.
```
docker run -it -p 8081:8080 --rm --name emirna-frontend-1 emirna-frontend
```
### load nginx container 

build image, andrun the app in a Docker container. We should be able to access our Vue.js app on localhost:8081.

```
docker-compose up -f docker-compose.yml
```

```
docker build -f Dockerfile_prod -t emirna-frontend .
docker run -it -p 8080:80 --rm emirna-frontend
```