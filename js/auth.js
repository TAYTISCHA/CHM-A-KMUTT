function showLoading(text){

  document.getElementById(
    'loadingPopup'
  ).style.display='flex';

  document.getElementById(
    'loadingText'
  ).innerText=text;

}

function hideLoading(){

  document.getElementById(
    'loadingPopup'
  ).style.display='none';

}

async function login(){

  showLoading('กำลังเข้าสู่ระบบ...');

  const studentId =
    document.getElementById(
      'studentId'
    ).value;

  const password =
    document.getElementById(
      'password'
    ).value;

  try {

    const res = await fetch(API_URL,{

      method:'POST',
      mode:'cors',

      headers:{
        'Content-Type':'application/json'
      },

      body:JSON.stringify({

        action:'login',

        studentId,

        password,

        deviceId:getDeviceId()

      })

    });

    const data =
      await res.json();

    hideLoading();

    const msg =
      document.getElementById(
        'message'
      );

    if(data.success){

      localStorage.setItem(
        'token',
        data.token
      );

      localStorage.setItem(
        'role',
        data.role
      );

      location.href =
        'dashboard.html';

    } else {

      msg.innerText =
        data.message;

    }

  } catch(err){

    hideLoading();

    alert('LOGIN ERROR');

  }

}

async function register(){

  showLoading('กำลังสมัครสมาชิก...');

  const studentId =
    document.getElementById(
      'studentId'
    ).value;

  const password =
    document.getElementById(
      'password'
    ).value;

  const inviteCode =
    document.getElementById(
      'inviteCode'
    ).value;

  try {

    const res = await fetch(API_URL,{

      method:'POST',

      headers:{
        'Content-Type':'application/json'
      },

      body:JSON.stringify({

        action:'register',

        studentId,

        password,

        inviteCode,

        deviceId:getDeviceId()

      })

    });

    const data =
      await res.json();

    hideLoading();

    const msg =
      document.getElementById(
        'message'
      );

    msg.innerText =
      data.message;

  } catch(err){

    hideLoading();

    alert('REGISTER ERROR');

  }

}
