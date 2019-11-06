

var socket = io();




var form = document.getElementById("formInput")
var input = document.getElementById("m");
var messages = document.getElementById("messages")


form.addEventListener("submit",function (e) {
    e.preventDefault(); // prevents page reloading
    var val = input.value;
    input.value = "";
    socket.emit("chat message", val)
})




var appendLi = function (message)
{
    var li = document.createElement("li");
    var textNode = document.createTextNode(message);
    li.appendChild(textNode);
    messages.appendChild(li);
}


socket.on("chat message", function(msg) {
    appendLi(msg);
})


