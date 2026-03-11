const API = "http://localhost:3000";

async function signup(){

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(API + "/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            email,
            password
        })
    });

    const data = await res.json();

    alert(data.message);
}

async function login(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;

    const res = await fetch(API + "/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
    });

    const data = await res.json();

    if(data.token){

        if(remember){
            localStorage.setItem("token",data.token);
        }else{
            sessionStorage.setItem("token",data.token);
        }

        window.location="dashboard.html";

    }else{
        alert(data.message);
    }

}

function logout(){

    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    window.location="index.html";
}

async function loadDashboard(){

    const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

    if(!token){
        window.location="index.html";
        return;
    }

    const res = await fetch(API + "/dashboard",{
        headers:{
            authorization: token
        }
    });

    const data = await res.json();

    document.getElementById("welcome").innerText = data.message;
}

if(window.location.pathname.includes("dashboard")){
    loadDashboard();
}
