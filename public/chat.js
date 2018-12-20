// socket connection
const socket = io.connect('http://localhost:4000');

// Talk with DOM

let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

// click event listener

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = '';
});


message.addEventListener('keydown', () => {

    socket.emit('typing', {
        typing: `${handle.value} is typing...` , 
    });
});

message.addEventListener('keyup', () => {

    socket.emit('typing', {
        typing: `` , 
    });
});

/// socket listening

socket.on('chat', (data) =>  {
     output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('typing', (data) =>  {
    feedback.innerHTML =  `<p><em>${data.typing}</em></p>`;
});