// This will run whenever the client emit 'newMessage'
'use strict'
const SocketManager = require('../SocketManager')

/**
 * Client needs to emit 'newMessage' and pass obj with 2 options
 * message: includes the message he wants to send
 * to: the room ID he wants to send to.
 */
function newMessage(socket, obj, callback) {
  return new Promise(
    (resolve, reject) => {
      // Object needs to include message and to
      if(!obj || !obj.message || !obj.to) {
        let err = new Error(`You need to pass 'message' and 'to' as properties to ${newMessage.name}`)
        return callback ? callback(err) : reject(err)
      } else {
        // Maybe store the message first in the db?
        // Then notify everyone in that particular room about the new message
        socket.to(obj.to).emit('message', obj.message)
      }
    }
  )
}

module.exports = newMessage