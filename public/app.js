const createUserForm = document.getElementById("createUserForm");
const loginForm = document.getElementById("loginForm");
const prompt = document.getElementById("prompt")
const ideaForm = document.getElementById("ideaForm");
let isLoggedIn = false;
const loginBtn = document.getElementById("loginBtn")
const createIdeaBtn = document.getElementById("createIdeaBtn");
const logoutBtn = document.getElementById('logoutBtn')
const upvoteDisplay = document.getElementById("upvoteDisplay")
const downvoteDisplay = document.getElementById("downvoteDisplay")



let user = null;


const afterLoginAttempt = (status) => {
  
    isLoggedIn = status;
    // Hide all the buttons
    loginBtn.style.display = status ? "none" : "flex";
    createIdeaBtn.style.display = status ? "flex" : "none";
    logoutBtn.style.display = status ? "flex" : "none";

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
     setTimeout(() => {
       window.location.href = "/";
     }, 500);
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
   setTimeout(() => {
     window.location.href = "/";
   }, 500);
  }
});


logoutBtn.addEventListener("click",async()=>{
  const response = await fetch("/logout")
  afterLoginAttempt(false) 
  window.location.href = "/"
})


ideaForm &&
  ideaForm
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = user.id;
      const title = document.getElementById("head").value;
      const body = document.getElementById("body").value;

      const response = await fetch("/saveIdea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id,title, body }),
      });

      const data = await response.json()
      if (response.ok) {

        showPrompt("success",data.message)
        setTimeout(() => {
          window.location.href = "/"
        },1000)
      } else {
        // If the request failed, display an error message
         showPrompt("error", data.message);
      }
    });



// Add event listeners to all cards
document.querySelectorAll('.card').forEach((card) => {
  // Get the idea ID from the data-key attribute
  const ideaId = card.dataset.key;

  // keep track of upvote and downvote
  let isUpvoted = false;
  let isDownvoted = false;

  // Add event listeners to the upvote and downvote buttons
  card.querySelector('.up').addEventListener('click', async (e) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const response = await fetch(`/ideas/${ideaId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ upvote: isUpvoted ? -1 : 1 }), // Toggle upvote
    });

    if (response.ok) {
      let prevCount = +(upvoteDisplay.textContent) || 0;
      upvoteDisplay.textContent = isUpvoted ? prevCount - 1 : prevCount + 1; // Update count
      isUpvoted = !isUpvoted; // Toggle upvote state
    } else {
      alert('Failed to upvote idea');
    }
  });

  card.querySelector('.down').addEventListener('click', async (e) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const response = await fetch(`/ideas/${ideaId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ downvote: isDownvoted ? -1 : 1 }), // Toggle downvote
    });

    if (response.ok) {
      let prevCount = +(downvoteDisplay.textContent) || 0;
      downvoteDisplay.textContent = isDownvoted ? prevCount - 1 : prevCount + 1; // Update count
      isDownvoted = !isDownvoted; // Toggle downvote state
    } else {
      alert('Failed to downvote idea');
    }
  });
});
