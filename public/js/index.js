// register request with ajax
function register() {
        //post

      let email = document.getElementById('r-email').value
      let password = document.getElementById('r-psw').value

      let data = {
        email,
        password
      };

      fetch("/mmo/register", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Origin": "*"
        },
        method: "POST",
        body: JSON.stringify(data)
      })
      .then( responseJSON => responseJSON.json())
      .then( body => {
        console.log(body)

      })
      .catch( error => {
        console.error(error)



      })

          }

// login request with ajax
function login() {

            // POST

            let email = document.getElementById('l-email').value
            let password = document.getElementById('l-psw').value

            let data = {
              email,
              password
            };

            fetch("/mmo/login", {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Origin": "*"
              },
              method: "POST",
              body: JSON.stringify(data)
            })
            .then( responseJSON => responseJSON.json())
            .then( body => {
              console.log(body)
            })
            .catch( error => {
              console.error(error)
            })


          }

/* Show form of given id */
function openForm(id) {
  document.getElementById(id).style.display = "block";
}

/* Hide form of given id */
function closeForm(id) {
  document.getElementById(id).style.display = "none";
}

/* Change message shown on screen */
function changeMessage() {
  let message = document.getElementById("tips");        // grab element displaying messages
  message.innerHTML = messages[messageIndex];           // change message
  messageIndex = (messageIndex + 1) % messages.length;  // get index of next message
}

/* Messages iterated through on screen */
let messages = [
  "Use WASD or the arrow keys to move.",
  "Don't crash into other snakes.",
  "Eat food to grow bigger."
];

let messageIndex = 0; // initialize message counter

/* When all content has loaded */
window.onload = function() {

  changeMessage();                  // set first message
  setInterval(changeMessage, 5000); // repeatedly loop through messages

}
