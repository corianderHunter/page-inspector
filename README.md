# page-inspector  [![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

> record the every visit of your website , and then replay.

### js library for recording and replay

- Configure websocket url in .env file(as your need)
- build js lib with 
    ```
        npm run build
    ```
- put `/dist/page-replay.min.js` in your we-bpage to record the visit of website
### server

- Configure your .env file in `./server`(as your need)
- create folder `/db/mongo` in `./server ` for data storage of the mongo db 
- build docker image for node service（only need build once）
    ```
        cd server&&docker build -t node-pm2 .
    ```
- start service in docker
    ```
        docker-compose up or docker-compose up -d 
    ```

### replay client

- Configure in ./config/*.env.js as your need
- init service
    ```
        npm run dev
    ```
