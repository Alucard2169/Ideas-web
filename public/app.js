const createUserForm = document.getElementById("createUserForm");
const loginForm = document.getElementById("loginForm");
const prompt = document.getElementById("prompt")

let isLoggedIn = false;
const loginBtn = document.getElementById("loginBtn")
const createIdeaBtn = document.getElementById("createIdeaBtn");
const logoutBtn = document.getElementById('logoutBtn')
const profileBtn = document.getElementById("profileBtn");

let user;
console.log(user)

const afterLoginAttempt = (status) => {
  
    isLoggedIn = status;
    // Hide all the buttons
    loginBtn.style.display = status ? "none" : "flex";
    profileBtn.style.display = status ? "none" : "flex";
    createIdeaBtn.style.display = status ? "flex" : "none";
    logoutBtn.style.display = status ? "flex" : "none";
    profileBtn.style.display = status ? "flex" : "none";
  
};

afterLoginAttempt(false);


// show prompt
const showPrompt = (status,message) => {
  prompt.classList.add(status)
  prompt.textContent = message

  setTimeout(() => {
    prompt.classList.remove(status);
  }, 2000)
  
}


(async function initial() {
  const response = await fetch("/initial");
  const data = await response.json();

  if (!response.ok) {
    return
  } else {
    afterLoginAttempt(true);
    user = data.user;
  }
})();


createUserForm && createUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  // send post req
  const response = await fetch("/addUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  console.log(data)
  if (!response.ok) {
    showPrompt("error",data.message)
  }
  else {
    showPrompt("success", data.message)
    user = data.user;
    afterLoginAttempt(true);
  }
});


loginForm && loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  // send post req
  const response = await fetch("/loginUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    showPrompt("error", data.message);
  } else {
    showPrompt("success", data.message);
    user = data.user;
    afterLoginAttempt(true);
  }
});


logoutBtn.addEventListener("click",async()=>{
  const response = await fetch("/logout")
  afterLoginAttempt(false) 
  if (response.ok) {
    afterLoginAttempt(false);
    
  }
})