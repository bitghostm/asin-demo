# asin-demo

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)

# Getting started
- Install dependencies
```
cd packages/api/
npm install
```

```
cd packages/viewer/
npm install
```

- Start your mongoDB server 
```
mongod
```

- Start API server
```
cd packages/api/
npm run build
npm start
```

- Start Web App
```
cd packages/viewer/
npm run build
npm start
```
