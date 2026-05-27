const role =
  localStorage.getItem('role');

if(
  role !== 'OWNER' &&
  role !== 'SENIOR'
){
  location.href='index.html';
}

loadPending();

async function loadPending(){

  const res = await fetch(API_URL,{

    method:'POST',

    headers:{
      'Content-Type':'application/json'
    },

    body:JSON.stringify({

      action:'getPending'

    })

  });

  const data =
    await res.json();

  const list =
    document.getElementById(
      'pendingList'
    );

  list.innerHTML='';

  data.users.forEach(user=>{

    list.innerHTML += `

      <div style="
        background:white;
        color:black;
        padding:10px;
        margin-bottom:10px;
        border-radius:10px;
      ">

        ${user.studentId}

        <br><br>

        <button
          onclick="
            approveUser(
              '${user.studentId}'
            )
          "
        >
          APPROVE
        </button>

      </div>

    `;

  });

}

async function approveUser(studentId){

  await fetch(API_URL,{

    method:'POST',

    headers:{
      'Content-Type':'application/json'
    },

    body:JSON.stringify({

      action:'approveUser',

      studentId

    })

  });

  loadPending();

}

function logout(){

  localStorage.clear();

  location.href='index.html';

}
