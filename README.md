# Sunrise challenge backend. 


From [backend challenge](https://github.com/sunrise/jobs/blob/master/instructions/backend-engineer.md)


## How to 

```bash
$ npm install 
```

### Run the server 
```bash
$ node src/server.js
```

### Run the tests
```bash
$ make test
```



## Folder structure 

```bash
src/ # All sources files.
	configuration/ # configuration files in json format
	modules/ # all the modules used in the API
	rest/ # the respository for the calendar API
	logBonus.js # The bonus formating library
	server.js # main files for express
test/ # All the test files 
```

# Logging features

In order to get a full log, set to true the `DEBUG` constant in [src/modules/logger.js:15](https://github.com/llaine/sunrise-challenge-backend/blob/master/src/modules/logger.js#L15)


