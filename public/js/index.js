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
// register popup
function openForm2() {
            document.getElementById("myForm2").style.display = "block";
          }
          
function closeForm2() {
            document.getElementById("myForm2").style.display = "none";
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
// login popup         
function openForm() {
         document.getElementById("myForm").style.display = "block";
       }
      
function closeForm() {
         document.getElementById("myForm").style.display = "none";
       }
        