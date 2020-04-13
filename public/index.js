
//importing DOM elements
let textArea = document.getElementById("msg")
let sendBtn = document.getElementById("btn_send")
let page = document.getElementById("page")

async function getData() {
    const response = await fetch('/api')
    const data = await response.json()

    for (let i = 0; i < data.length; i++) {
        let item = data[i]
        console.log(item.msg)

        const text = document.createElement('p')
        text.textContent = item.msg

        page.append(text)
    }

}

getData()

let socket
socket = io.connect('http://localhost:3000')
socket.on('newText', newMsg)

function newMsg(data) {

    const text = document.createElement('p')
    text.textContent = data.msg

    page.append(text)

    console.log('receiving data: ' + data.msg)
}

sendBtn.addEventListener('click', sendText)

function sendText() {
    console.log('sending: ' + textArea.value)
    let data = {msg: textArea.value}
    socket.emit('msg', data)
}
