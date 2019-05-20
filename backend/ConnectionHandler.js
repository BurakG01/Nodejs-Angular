/**
 * This class will take care of handling socket connetions such as, what happens when a user is connected, sends a message, etc...
 */
// Theortically and even technically speaking, this can extend Socket; However, I prefer writing my own and setting socket as a property.

'use strict'
const fs = require('fs')
const path = require('path')

const basename = path.basename(module.filename)

class ConnectionHandler {
  constructor(socket = null) {
    if (socket === null) throw new Error('ConnecitonHandler takes socket as a parameter.')

    // Initialize conneciton
    this.socket = socket
    this.isConnected = true
    this.id = socket.id
    this.ip = socket.request.connection.remoteAddress
    this.port = socket.request.connection.remotePort

    // Register events of this socket
    registerEvents(this, socket)
  }

  /**
   * This method will disconnect socket
   * Return promise or callback
   */
  disconnect(callback) {
    return new promise(
      (resolve, reject) => {
        // Make sure socket exist and status is connected
        if (this.socket && this.isConnected === true) {
          // Socket exists
          this.isConnected = false
          this.socket.disconnect()
          return callback ? callback(null, true) : resolve(true)
        } else {
          this.isConnected = false
          let err = new Error('Socket is not connected to disconnect.')
          return callback ? callback(err, null) : reject(err)
        }
      }
    )
  }

  notify(message, options) {
    this.socket.emit('message', message)
  }

  joinRoom(room) {
    this.socket.join(room)
  }

  leaveRoom(room) {
    this.socket.leave(room)
  }
}

function registerEvents(connectionHandler, socket) {
  // Loop through every event in socketEvents folder and register each event using socket.on
  const socketEventsPath ='./socketEvents/'
  
  fs
    .readdirSync(socketEventsPath)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
      // This will get every file in socketEvents directory
      const fileName = file.substr(0, file.length - 3);
      
      // Require this file
      const func = require(`${socketEventsPath}${fileName}`)

      // Now register this event
      connectionHandler.socket.on(func.name, (...args) => {
        // Every function takes socket as its first arugment 
        func(connectionHandler.socket, ...args)
      })
    });
}

module.exports = ConnectionHandler
