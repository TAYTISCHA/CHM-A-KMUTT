async function login(){

  const studentId =
    document.getElementById('studentId').value;

  const password =
    document.getElementById('password').value;

  const res = await fetch(API_URL,{
    method:'POST',
    body:JSON.stringify({
      action:'login',
      studentId,
      password,
      deviceId:getDeviceId()
    })
  });

  const data = await res.json();

  const msg =
    document.getElementById('message');

  if(data.success){

    localStorage.setItem(
      'token',
      data.token
    );

    localStorage.setItem(
      'role',
      data.role
    );

    window.location.href='dashboard.html';

  }else{

    msg.innerText=data.message;

  }
}

async function register(){

  const studentId =
    document.getElementById('studentId').value;

  const password =
    document.getElementById('password').value;

  const inviteCode =
    document.getElementById('inviteCode').value;

  const res = await fetch(API_URL,{
    method:'POST',
    body:JSON.stringify({
      action:'register',
      studentId,
      password,
      inviteCode,
      deviceId:getDeviceId()
    })
  });

  const data = await res.json();

  const msg =
    document.getElementById('message');

  msg.innerText=data.message;
}
