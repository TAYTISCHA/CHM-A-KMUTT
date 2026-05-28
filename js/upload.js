const role =
  localStorage.getItem('role');

if(
  role !== 'OWNER' &&
  role !== 'SENIOR'
){

  location.href='dashboard.html';

}

async function uploadFile(){

  const file =
    document.getElementById(
      'fileInput'
    ).files[0];

  if(!file){

    alert('SELECT FILE');
    return;

  }

  if(file.size > 10 * 1024 * 1024){

    alert('FILE TOO LARGE');
    return;

  }

  document.getElementById(
    'message'
  ).innerText =
  'UPLOADING...';

  const reader =
    new FileReader();

  reader.onload =
    async function(){

      try{

        const base64 =
          reader.result
            .split(',')[1];

        const res =
          await fetch(API_URL,{

            method:'POST',

            headers:{
              'Content-Type':
              'application/json'
            },

            body:JSON.stringify({

              action:'uploadFile',

              fileName:file.name,

              mimeType:file.type,

              studentId:
                localStorage.getItem(
                  'studentId'
                ) || 'UNKNOWN',

              base64:base64

            })

          });

        const data =
          await res.json();

        document.getElementById(
          'message'
        ).innerText =

          data.success
          ?
          'UPLOAD SUCCESS'
          :
          data.message;

      }catch(err){

        console.log(err);

        alert(err);

      }

    };

  reader.readAsDataURL(file);

}
