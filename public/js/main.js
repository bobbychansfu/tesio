var username = "unknown"
function myfunction(){
	username = prompt("Please enter your name","unknown")
}

var socket = io()

socket.on('connect', function(){
	var msg = ` <span class="text-success">${username} has connected</span>`
	socket.emit('chat',msg)
})

socket.on('clientChange', function(clients){
	document.querySelector("#number").innerHTML = clients + " clients connected"
})

socket.on('message',function(message){
	// console.log(message)
	printMessage(message)
})

document.getElementById('discon').onclick = function(){
	socket.emit('chat', `<span class="text-danger">${username} has disconnected</span>`)
	socket.close()
}

function sub(){
	var input = document.getElementById("message")
	var msg = `<b>${username}</b>: ${input.value}`
	socket.emit('chat',msg)
	
	input.value =''
}

document.forms[0].onsubmit = sub

function printMessage(message){
	var p = document.createElement("p")
	p.innerHTML = message
	document.querySelector("div#messages").appendChild(p)
}