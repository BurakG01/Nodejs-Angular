/**
 * This class will take care of managing the socket operations, suck as, Start, Stop, Restart, Disconnect all sockets, send announcements, send notifications, etc...
 */

'use strict'

const async = require('async')
const ConnectionHandler = require('./ConnectionHandler')

class SocketManager {
  constructor() {
    // Constructor
    initDefaultValues(this)
  }

  start(express, app) {
    return new Promise(
      (resolve, reject) => {
        async.waterfall([
        // Set current variables
        async.apply(setStartVariables, this, express, app),

        // This will call the function handleStartErrors and pass variables to it one at a time
        async.apply(handleStartErrors, this),

        async.apply(socketIoListen, this),

        // Finally handle connections
        async.apply(handleConnections, this)

        ], (err) => {
          if(err) {
            reject(err)
          } else {
            this.status = "running"
            resolve(true)
          }
        })
      }
    )
  }

  stop() {
    return new Promise(
     (resolve,reject) => {
       if(this.isRunning() === false ){
         resolve(true)
       } else {
        async.series({
          closed: (callback) => {
              // First start by stopping all incomming connections
              this.socketIo.close();
              callback(null, true)
          },

          sockets: (callback) => {
            let sockets = []
              
            async.forEach(Object.keys(this.connectedSockets), (id, callback) => {
              let socket = this.connectedSockets[id]
              socket.disconnect()
              delete this.connectedSockets[id];
              callback(null)
            }, (err) => {
              err ? callback(err) : callback(null, sockets)
            });  
          }
        }, (err, results) => {
          if(err) {
              reject(err)
            } else {
              this.status = "stopped"
              resolve(true)
            }
        })
       }
      }
    )
  }

  restart(options = {express: null, app: null}) {
    /**
     * 1. Stop
     * 2. Start and pass express and app from options
     */
    return new Promise(
      (resolve, reject) => {
        async.series([
          // Set status
          (callback) => {
            this.status = "restarting..."
            callback(null)
          },

          // Stop socket
          (callback) => {
            this.stop()
              .then(stopped => stopped ? callback(null) : callback(new Error(`Failed to stop socket`)))
              .catch(err => callback(err))
          },
            
          // Start socket
          (callback) => {
            this.start(options.express, options.app)
            callback(null)
          }
          ], (err) => {
            err ? reject(err) : resolve(true)
          }
        )
      }
    )
  }

  getConnectedSockets(byIp = false) {
    return new Promise(
      (resolve,reject) => {
        /*
        This if you want to get an array only
        */
        let sockets = []

        if(byIp) sockets = {}
        
        async.forEach(Object.keys(this.connectedSockets), (id, callback) => {
          let socket = this.connectedSockets[id]
          let cleanSocket = {
            ip: socket.request.connection.remoteAddress,
            port: socket.request.connection.remotePort
          }
 
          if(byIp === true) {
            sockets[cleanSocket.ip] = cleanSocket.port
          } else {
            sockets.push(socket)
          }
        
          callback(null)
        }, (err) => {
          err ? reject(err) : resolve(sockets)
        });  
      }
    )
  }

  disconnectAllSockets() {
    // This is dictionary so time is O(n) n => all sockets
    for (const [id, socket] of Object.entries(this.connectedSockets)) {
      socket.disconnect()
      delete this.connectedSockets[id];
      delete this.connectionHandler[id]
    }
  }

  disconnectSockets(ids) {
    // This assumes that connectedSockets have the following format
    // {
    //    id:socketObject
    // }
    // Therefore, speed is O(n) n => ids. Since access time is O(1) for each element because its key,value 
    if (Array.isArray(ids)){
      ids.forEach(id => {
        let socket = this.connectedSockets[id]
        socket.disconnect()
        delete this.connectedSockets[id];
        delete this.connectionHandler[id];
      })
    } else {
      let socket = this.connectedSockets[ids]
      socket.disconnect()
      delete this.connectedSockets[ids];
      delete this.connectionHandler[ids]
    }
  }

  isRunning() {
    if(this.status && this.status === "running") {
      return true
    }

    return false
  }

  getServerStatus() {
    return this.status
  }

  notifyEveryone(message) {
    // This will notify all connected clients
    // Check:  for more info on different events and methods
    console.log('buradayim')
    this.socketIo.emit('notification', message)
  }

  notifyRoom(message, room) {

  }

  // Setters
  get express(){ return this._express }
  set express(value){ this._express = value }

  get app(){ return this._app }
  set app(value){ this._app = value }

  set newSocket(socket) {this.connectedSockets[socket.id] = socket}
  set newConnectionHandler(handler) {this.connectionHandler[handler.id] = handler}
  
  set status(status){this._status = status}
  get status() {return this._status}
}

// Priavte Methods
function initDefaultValues(socketManager) {
  if(!socketManager) throw new Error("You need to pass SocketManager instance before initialization")

  socketManager.status = "stopped"
  socketManager.connectedSockets = { }
  socketManager.connectionHandler = { }
}

function setStartVariables(socketManager, express, app, callback) {
  if (!socketManager) callback(new Error(`You need to pass SocketManager instance as the first parameter when calling ${setStartVariables.name}`))

  // Make sure socket is not running before setting variables
  if(socketManager.isRunning() === false ) {
    /** 
     * Does SocketManager have express and app already?
     * If yes and express or app were passed then replace them otherwise just use the existing once
     */
    if (!socketManager.express) {
      // Express was never initialized so just set it to whatever was passed

      // Even if passed express is null, is fine becasue the next function will take care of handeling this error
      socketManager.express = express
    } else {
      // If is initialized already and nothing was passed then just reuse otherwise use what was passed
      express ? socketManager.express = express: socketManager.express = socketManager.express
    }

    if(!socketManager.app) {
      socketManager.app = app
    } else {
      app ? socketManager.app = app: socketManager.app = socketManager.app
    }

    callback(null, socketManager.express, socketManager.app)
  } else {
    callback(new Error(`Socket is already running, can't alter variables`))
  }
}

/**
 * This functoin will 
 * @method handleStartErrors
 * @param {SocketManager} socketManager Instance of SocketManager
 * @param {express} express Express module
 * @param {app} app After initialzing express
 * @param {Function} callback a method that has error as the first parameter
 * @return none
 */
function handleStartErrors(socketManager, express, app, callback) {
  // Maybe this is just a restart? check if we need the parameters first
  if (!socketManager) callback(new Error(`You need to pass SocketManager instance as the first parameter when calling ${handleStartErrors.name}`))

  if (!express) callback(new Error(`${handleStartErrors.name} 2nd parameter needs to be the Express module`))

  if (!app) callback(new Error(`${handleStartErrors.name} 3rd parameter needs to be an instance of the express module`))

  if (socketManager.isRunning() === true) callback(new Error("The socket is already running"))

  // If no error then just callback null
  callback(null, express, app)
}

function socketIoListen(socketManager, express, app, callback) {
  //Create socket constant
  const io = require("socket.io")(express.server);
  
  //Listen the socket in the app
  io.listen(app.server);

  socketManager.socketIo = io

  callback(null, io)
}

function handleConnections(socketManager, socketIo, callback) {
  async.series([
    // Whenever there is a new connection create a handler for it
    (callback) => {
      socketIo.on('connection', (socket) => {
        // New conneciton was initialized so add it to the array
        socketManager.newSocket = socket

        // Create a new connection handler
        let handler = new ConnectionHandler(socket)
        socketManager.newConnectionHandler = handler
        
        // Notify the user that they are connected (this is really not necessary but just to demonstrate the feature)
        handler.notify('You are connected!!!!!')
      })

      callback(null)
    },

  ], (err) => {
    err ? callback(err) : callback(null)
  })
}

module.exports = new SocketManager()
