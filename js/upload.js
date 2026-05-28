const role =
  localStorage.getItem('role');

if(
  role !== 'OWNER' &&
  role !== 'SENIOR'
){

  location.href='dashboard.html';

}

/*
========================
POPUP
========================
*/

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

/*
========================
UPLOAD
========================
*/

async function uploadFile(){

  const file =
    document.getElementById(
      'fileInput'
    ).files[0];

  if(!file){

    alert('SELECT FILE');
    return;

  }

  /*
  ========================
  25MB LIMIT
  ========================
  */

  if(file.size > 25 * 1024 * 1024){

    alert(
      'FILE TOO LARGE (MAX 25MB)'
    );

    return;

  }

  showLoading(
    'กำลังอัปโหลดไฟล์ กรุณารอสักครู่...'
  );

  const reader =
    new FileReader();

  reader.onerror = () => {

    hideLoading();

    alert(
      'READ FILE ERROR'
    );

  };

  reader.onload = () => {

    try{

      const base64 =
        reader.result
          .split(',')[1];

      const payload = JSON.stringify({

        action:'uploadFile',

        fileName:file.name,

        mimeType:file.type,

        studentId:
          localStorage.getItem(
            'studentId'
          ) || 'UNKNOWN',

        base64:base64

      });

      const xhr =
        new XMLHttpRequest();

      xhr.open(
        'POST',
        API_URL,
        true
      );

      xhr.setRequestHeader(
        'Content-Type',
        'text/plain'
      );

      /*
      ========================
      SUCCESS
      ========================
      */

      xhr.onload = function(){

        hideLoading();

        try{

          const data =
            JSON.parse(
              xhr.responseText
            );

          if(data.success){

            alert(
              'UPLOAD SUCCESS'
            );

            document.getElementById(
              'message'
            ).innerText =
            'UPLOAD SUCCESS';

          }else{

            alert(data.message);

          }

        }catch(err){

          alert(
            'INVALID SERVER RESPONSE'
          );

        }

      };

      /*
      ========================
      ERROR
      ========================
      */

      xhr.onerror = function(e){

        console.log(e);

        hideLoading();

        alert(
          'UPLOAD FAILED'
        );

      };

      /*
      ========================
      SEND
      ========================
      */

      xhr.send(payload);

    }catch(err){

      hideLoading();

      console.log(err);

      alert(String(err));

    }

  };

  reader.readAsDataURL(file);

}
