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

  const reader =
    new FileReader();

  reader.onload =
    async function(){

      const base64 =
        reader.result
          .split(',')[1];

      const url =

        API_URL +

        '?action=uploadFile' +

        '&fileName=' +
        encodeURIComponent(
          file.name
        ) +

        '&mimeType=' +
        encodeURIComponent(
          file.type
        ) +

        '&studentId=' +
        encodeURIComponent(
          localStorage.getItem(
            'studentId'
          ) || 'UNKNOWN'
        ) +

        '&base64=' +
        encodeURIComponent(
          base64
        );

      const res =
        await fetch(url);

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

    };

  reader.readAsDataURL(file);

}
