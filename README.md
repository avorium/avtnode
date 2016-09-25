# business-app-skeleton


This is a NodeJS skeleton for a business app with user management and authentication. It is based on the [MEAN stack principle](http://mean.io/) (MongoDB, Express, AngularJS, NodeJS). You can use it as starting point for applications that require user authentication against a database.


## Features


- HTTPS support (https://nodejs.org/api/https.html)
- Header based authentication (https://github.com/jshttp/basic-auth)
- REST-API for user management (documentation is under /apidoc)
- Serving static content
- Very minimalistic code, easy to understand and to extend


## Installation


This app requires [Node.js](https://nodejs.org/) v4+ to run.

Download and extract the lastest release of this app directly from github.

Install the dependencies and start the server. On Windows you need to open the command line as Administrator to get the server running on SSL-Port 443.

```
cd business-app-skeleton
npm install -d
node app
```

You can also open the app directly in [Visual Studio Code](https://code.visualstudio.com/) to debug it.

At the first start an user with username "admin" and password "admin" is automatically created, so you can start using the user management and authenticate yourself.


### MongoDB


Under Windows follow these steps to get MongoDB as service running (from https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#configure-a-windows-service-for-mongodb-community-edition).

Download and install MongoDB.

Create directories for the MongoDB databases and log files. Here it is assumed to have a drive D, where all MongoDB-related files are stored.

```
C:\> D:
D:\> mkdir D:\MongoDB
D:\> mkdir D:\MongoDB\db
D:\> mkdir D:\MongoDB\log
```

Create a config file in \MongoDB\mongod.cfg with following content.

```
systemLog:
    destination: file
    path: D:\MongoDB\log\mongod.log
storage:
    dbPath: D:\MongoDB\db
```

Open an Administrator command prompt and install and start the service. Replace the path for mongod.exe depending on your installation.

```
C:\> "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --config D:\MongoDB\mongod.cfg --install
C:\> net start MongoDB
```


## SSL-Certificates


For development you need to create your own self-signed certificates and store them into the priv.key and pub.cert files. This can be done easily with http://www.selfsignedcertificate.com/.


## Used NodeJS packages


- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - For password encryption
- [basic-auth](https://www.npmjs.com/package/basic-auth) - For extracting the username and password out of the request headers
- [express](https://www.npmjs.com/package/express) - As application framework
- [compression](https://www.npmjs.com/package/compression) - To compress the output to the client and to save bandwidth
- [body-parser](https://www.npmjs.com/package/body-parser) - To parse the request body from the client into JSON
- [monk](https://www.npmjs.com/package/monk) - As database access layer to MongoDB
- [fs](https://nodejs.org/api/fs.html) - For reading the SSL key and certificate files
- [https](https://nodejs.org/api/https.html) - For providing HTTPS connections to the server
- [angular-aria](https://www.npmjs.com/package/angular-aria) - AngularJS module for making accessibility easy
- [angular-animate](https://www.npmjs.com/package/angular-animate) - AngularJS module for animations
- [angular](https://www.npmjs.com/package/angular) - The AngularJS framework
- [angular-material](https://www.npmjs.com/package/angular-material) - UI design templates based on Google Material for AngualarJS


## Useful links


- [Best Practices for Designing a Pragmatic RESTful API](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#json-requests)
- [HTTP/1.1 Method definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)
- [Handling problems with self-signed certificates in Advanced REST client](https://restforchrome.blogspot.de/2016/04/advanced-rest-client.html)
- [THE DEAD-SIMPLE STEP-BY-STEP GUIDE FOR FRONT-END DEVELOPERS TO GETTING UP AND RUNNING WITH NODE.JS, EXPRESS, JADE, AND MONGODB](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/)
- [How to use basic authentication with jQuery AJAX](http://stackoverflow.com/questions/5507234/how-to-use-basic-auth-with-jquery-and-ajax/11960692#11960692)
- [Online README.md markdown editor](http://dillinger.io/)
- [API documentation with swagger](http://swagger.io/)