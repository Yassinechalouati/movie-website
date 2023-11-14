let file ;
let BodyChange = () => {
    document.body.innerHTML = ` <div class ="container"> 
    <div class="form-container sign-up-container"> 
        <form action="#" >  
            <h1>Create Account</h1>  
            <input type="text" id="nameInput" placeholder="Name" required>  
             <input type="email" id="emailInput" placeholder="Email" required> 
            <input type="password" id="pwdInput" placeholder="Password" required> 
            <input type="password" id="pwdConfirmation" placeholder="Confirm Password" required>
            <div class="pic-pick">
              <input type="file" id="actual-btn" hidden/>

              <label class="choose_pic" for="actual-btn">Upload picture</label>
              
            

              <img id="image-preview" src="" alt="Selected Image">
            </div>
        <div> 
                <button class="button1" onclick="BodyChangev2()" type ="button">Log In</button> 
                <button class="button2" onclick ="submitForm()" type ="submit">Create Account</button> 
        </div>
        </form> 
        </div> 
    </div> 

    <script src="script-login.js"></script>`

    const actualBtn = document.getElementById('actual-btn');

   

    const imagePreview = document.getElementById('image-preview');
    
    actualBtn.addEventListener('change', function(){
      file = this.files[0]
      console.log(file.name)
     

      const imageUrl = URL.createObjectURL(file);
      imagePreview.src = imageUrl;
      imagePreview.style.display = 'block'; // or 'inline'
      
    })
   
}

let BodyChangev2 = () => {
    document.body.innerHTML = `<div class="container">
    <div class="form-container sign-in-container">
        <form action="#">
            <h1>Sign In</h1>
            <input type="email" id="email" placeholder="Email" required>
            <div class="password-container">
					    <input type="password" id="pwd" placeholder="Password" required>
					    <button class="show-password" onclick="togglePasswordVisibility()" type="button"></button>
				    </div>
            <a href="#">Forgot your password?</a>
            <div>
                <button class ="button1"  onclick="BodyChange()" type="button">Sign up</button>
                <button class ="button2" onclick="login()" >Sign in</button>
            </div>
        </form>
    </div>

    <script src="script-login.js"></script>
</div>`
}



async function submitForm() {
  event.preventDefault(); 
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("pwdInput");
  const pwdConfirmation = document.getElementById("pwdConfirmation");

  passwordInput.addEventListener("input", function() {
    if (passwordInput.value.length < 8) {
      passwordInput.setCustomValidity("Password must be at least 8 characters long.");
    } else {
      passwordInput.setCustomValidity("");
    }
    passwordInput.reportValidity();
  });

  // Custom validation for password confirmation input
  pwdConfirmation.addEventListener("input", function() {
    if (passwordInput.value !== pwdConfirmation.value ){
      pwdConfirmation.setCustomValidity("The password confirmation is not valid");
    }
    else {
      pwdConfirmation.setCustomValidity("");
    }
    pwdConfirmation.reportValidity();
  });

  // Reset the custom validity message for the nameInput field on each input event
  nameInput.addEventListener("input", function() {
    nameInput.setCustomValidity("");
    nameInput.reportValidity();
  });

  emailInput.addEventListener("input", function() {
    emailInput.setCustomValidity("");
    emailInput.reportValidity();
  });

  // Trigger the input event to set the initial custom validity messages
  nameInput.dispatchEvent(new Event("input"));
  emailInput.dispatchEvent(new Event("input"));
  passwordInput.dispatchEvent(new Event("input"));
  pwdConfirmation.dispatchEvent(new Event("input"));

  try { 
    
      const response = await axios.post('http://localhost:3000/signup' , {
        Customer_name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        profile_pic: file.name,
      });

      if (response.data.message === 'fields are empty!') {
        alert("Fill out the whole form!")
      }

      if (response.data.message === 'Username already exists!'){
        nameInput.setCustomValidity("This username already exists"); 
      }
      else {
        nameInput.setCustomValidity("");
      }
      nameInput.reportValidity();

      if (response.data.message === 'Email already exists!') {
        emailInput.setCustomValidity("An account is already made with this email");
      }
      else {
        emailInput.setCustomValidity("");
      }
      emailInput.reportValidity();

      if (response.data.message === 'User created successfully'){
        emailInput.setCustomValidity("");
        alert("Your account has been created successfully");
        setTimeout(() => {
          BodyChangev2();
        }, 1000);
      }

      
    
  } catch (error) {
    if (!file) {
      alert("Fill out the whole form!")
    }
    console.log(error);
  }
}

function login() {
  event.preventDefault();
    const email = document.getElementById("email"); 
    const pwd = document.getElementById("pwd");
    console.log(pwd.value, email.value)
    axios.post('http://localhost:3000/login', {
      email: email.value,
      password: pwd.value
    })
    .then(function (response) {
      if (response.data.message === 'in'){
        alert(`Welcome ${response.data.user}`);
        redirectt(response.data.picture, response.data.user)
      }
      else {
        alert("Wrong credentials, try again!");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  
  }

  
  let redirectt =(url, name) => {
    window.location.href = "../movie_page/index.html?redirected=true&url="+url+"&name="+name;
  }


  function togglePasswordVisibility() {
    var pwdInput = document.getElementById("pwd");
    var showPasswordBtn = document.querySelector(".show-password");
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      showPasswordBtn.classList.add("hide");
    } else {
      pwdInput.type = "password";
      showPasswordBtn.classList.remove("hide");
    }
  }
