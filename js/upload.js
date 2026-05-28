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

document.getElementById(
  'uploadForm'
).addEventListener(
  'submit',
  async function(e){

    e.preventDefault();

    const file =
      document.getElementById(
        'fileInput'
      ).files[0];

    if(!file){

      alert('SELECT FILE');
      return;

    }

    showLoading(
      'กำลังอัปโหลดไฟล์...'
    );

    try{

      const reader =
        new FileReader();

      reader.onload =
        async function(){

          try{

            const base64 =
              reader.result
                .split(',')[1];

            const formData =
              new FormData();

            formData.append(
              'action',
              'uploadFile'
            );

            formData.append(
              'fileName',
              file.name
            );

            formData.append(
              'mimeType',
              file.type
            );

            formData.append(
              'studentId',
              localStorage.getItem(
                'studentId'
              ) || 'UNKNOWN'
            );

            formData.append(
              'base64',
              base64
            );

            const res =
              await fetch(API_URL,{

                method:'POST',

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

            hideLoading();

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

            hideLoading();

            console.log(err);

            alert(err);

          }

        };

      reader.readAsDataURL(file);

    }catch(err){

      hideLoading();

      console.log(err);

      alert(err);

    }

  }
);
