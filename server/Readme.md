# MVEN (MongoDB, Vue.JS, Express, Node.JS) PROJECT

the project implement CRUD operations on clients and providers.

---
## 1. Requirements

For development, you will only need `Node.js` and a node global package, `npm`, `git`, `mongodb` (For database) installed in your environment.

### `Node.js / npm`
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.

- #### Node installation on Linux (Ubuntu)

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt update
      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### `Git`
- #### Git installation on Windows
Visit: this site https://git-scm.com/ and download executable file and run it

- #### Git installation on Linux(Ubuntu)

       $ sudo apt-get install git

After you can run this command to check

      $ git --version
      git version 2.25.1

### `MongoDB`

Visit this link and follow the installation instructions for your OS

=> [Ubuntu installation link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

=> [Windows installation link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

=> [macOS installation link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x-tarball/)

After mongoDB installing run

    $ mongo --version

      Build Info: {
      "version": "4.4.4",
      "gitVersion": "8db30a63db1a9d84bdcad0c83369623f708e0397",
      "modules": [],
      "allocator": "system",
      "environment": {
          "distarch": "x86_64",
          "target_arch": "x86_64"
      }

Connect to mongoDB shell

    $ mongo
    > show dbs

    admin         0.000GB
    client-app    0.000GB
    config        0.000GB
    local         0.000GB

---
## 2. Install project


Clone the project code on your machine

    $ git clone https://github.com/sylvain12/mven-project
    $ cd mven-project
    $ ls
    Readme.md   client   config.example.env models   package-lock.json  routes     utils app.js    config.env    controllers   package.json  server.js

## 3. Configuraton
 ### `Node Configuration`
 At the root of the project run :

    $ npm install
 ### `Client side (Vue.JS) Configuration`
    $ cd client
    $ npm install

 ### `Database Configuration`
Connect to mongoDB and create a database

    $ mongo
    > use <database_name>
    switched to db <database_name>
    > quit()
    $ 
    
### `Environment variables configuration`
move the `config.example.env` to `config.env`
Make sure to in the root of the project

    $ mv config.example.env config.env

open the `config.env` file and set variable environment

Replace all the variable between with their corresponding value

    PORT=<NODE_SERVER_PORT>
    DATABASE_LOCAL=mongodb://localhost:<MONGODB_PORT>/<DATABASE_NAME>
    DATABASE_PROD=<PRODUCTION_DATABASE_URI>
    NODE_ENV=development
NB: for deployment we use `production`

After variables environment configuration, set `NODE_PORT` on vue.js config to proxy node.js server API. Make sure to be on client folder, and open `vue.config.js` file.

    $ nano vue.config.js

    proxy: {
      '/api/v1': {
        target: `http://localhost:<NODE_PORT>`
      }
    }
Don't forget to save the file.

## 4. Running the project

### `development`
    $ npm run dev

  `LOCAL_SERVER` : `localhost:NODE_PORT`

  `API_ROUTE` : `localhost:NODE_PORT/api-docs`

  `CLIENT_APP` : `localhost:8000`
  

## - PROJECT API 
Visit this address on your web browser for project API documentation with [swagger](https://swagger.io/) and [openAPI](https://www.openapis.org/)


# `localhost:<NODE_PORT>/api-docs`

<!-- ### `production`
    $ npm run prod -->


## 5. Testing
Coming soon...!