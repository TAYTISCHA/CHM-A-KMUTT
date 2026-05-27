// js/admin.js

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

  try{

    const url =

      API_URL +

      '?action=getPending';

    const res =
      await fetch(url);

    const data =
      await res.json();

    console.log(data);

    const list =
      document.getElementById(
        'pendingList'
      );

    list.innerHTML='';

    if(

      !data.users ||

      data.users.length === 0

    ){

      list.innerHTML =
        'NO PENDING USERS';

      return;

    }

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

  }catch(err){

    console.log(err);

    alert(err);

  }

}

async function approveUser(studentId){

  try{

    const url =

      API_URL +

      '?action=approveUser' +

      '&studentId=' +

      encodeURIComponent(studentId);

    const res =
      await fetch(url);

    const data =
      await res.json();

    if(data.success){

      alert('APPROVED SUCCESS');

      loadPending();

    }else{

      alert(data.message);

    }

  }catch(err){

    console.log(err);

    alert(err);

  }

}

function logout(){

  const deviceId =
    localStorage.getItem(
      'deviceId'
    );

  localStorage.clear();

  localStorage.setItem(
    'deviceId',
    deviceId
  );

  location.href='index.html';

}
