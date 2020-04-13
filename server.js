let express = require('express')
let app = express()

/*
users = []
connections = []
*/

const Datastore = require('nedb')
const database = new Datastore('database.db')
database.loadDatabase()

const port = process.env.PORT || 3000
let server = app.listen(port, function () {
    console.log('listening at port: ${port}')
})

app.use(express.static('public'))

console.log('server running !')

//setting up GET route
app.get('/api', function (req, res) {
    //selecting all the database
    database.find({}, (err, data) => {
        res.json(data)
    })
})

let socket = require('socket.io')
let io = socket(server)

//event socket
io.sockets.on('connection', newConnection)

function newConnection(socket) {
    console.log('new connection: ' + socket.id)

    socket.on('msg', newMsg)
    function newMsg(data) {
        console.log(data)
        //transmition of data to clients
        io.emit('newText', data)
        //save in message in the database
        database.insert({msg: data.msg})

    }
}

/*
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

io.sockets.on('connection', function(socket) {
    connections.push(socket)
    console.log('Connected: %s sockets connected', connections.length)

    //disconnect
    io.sockets.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1)
        console.log('Disconnected: %s sockets connected', connections.length)
    })
})
*/
