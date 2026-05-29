let allFiles = [];

/*
========================
LOAD FILES
========================
*/

async function loadFiles(){

  try{

    const res =
      await fetch(

        API_URL +

        '?action=getFiles'

      );

    const data =
      await res.json();

    console.log(data);

    if(data.success){

      allFiles = data.files;

      renderFiles(allFiles);

    }else{

      alert(data.message);

    }

  }catch(err){

    console.log(err);

    alert(err);

  }

}

/*
========================
RENDER FILES
========================
*/

function renderFiles(files){

  const fileList =
    document.getElementById(
      'fileList'
    );

  if(files.length === 0){

    fileList.innerHTML =

      '<p>NO FILES</p>';

    return;

  }

  fileList.innerHTML = '';

  files.forEach(file => {

    fileList.innerHTML += `

      <div class="file-card">

        <h3>
          ${file.fileName}
        </h3>

        <p>
          ${file.fileType}
        </p>

        <button
          onclick="
            openFile(
              '${file.driveUrl}'
            )
          "
        >
          OPEN
        </button>

      </div>

      <br>

    `;

  });

}

/*
========================
OPEN FILE
========================
*/

function openFile(url){

  location.href =

    'viewer.html' +

    '?url=' +
    encodeURIComponent(url);

}

/*
========================
SEARCH
========================
*/

function searchFiles(){

  const keyword =
    document.getElementById(
      'searchInput'
    )
    .value
    .toLowerCase();

  const filtered =
    allFiles.filter(file =>

      file.fileName
        .toLowerCase()
        .includes(keyword)

    );

  renderFiles(filtered);

}

/*
========================
START
========================
*/

loadFiles();
