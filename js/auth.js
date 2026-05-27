function getDeviceId(){

  let id =
    localStorage.getItem(
      'deviceId'
    );

  if(!id){

    id =
      crypto.randomUUID();

    localStorage.setItem(
      'deviceId',
      id
    );

  }

  return id;

}

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

  try{

    const url =

      API_URL +

      '?action=login' +

      '&studentId=' +
      encodeURIComponent(studentId) +

      '&password=' +
      encodeURIComponent(password) +

      '&deviceId=' +
      encodeURIComponent(
        getDeviceId()
      );

    const res =
      await fetch(url);

    const data =
      await res.json();

    hideLoading();

    if(data.success){

      localStorage.setItem(
        'role',
        data.role
      );

      location.href =
        'dashboard.html';

    }else{

      document.getElementById(
        'message'
      ).innerText =
      data.message;

    }

  }catch(err){

    hideLoading();

    alert(err);

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

  try{

    const url =

      API_URL +

      '?action=register' +

      '&studentId=' +
      encodeURIComponent(studentId) +

      '&password=' +
      encodeURIComponent(password) +

      '&inviteCode=' +
      encodeURIComponent(inviteCode) +

      '&deviceId=' +
      encodeURIComponent(
        getDeviceId()
      );

    const res =
      await fetch(url);

    const data =
      await res.json();

    hideLoading();

    document.getElementById(
      'message'
    ).innerText =
    data.message;

  }catch(err){

    hideLoading();

    alert(err);

  }

}
