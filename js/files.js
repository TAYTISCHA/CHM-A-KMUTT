loadFiles();

async function loadFiles(){

  const search =
    document.getElementById(
      'searchInput'
    ).value
    .toLowerCase();

  const url =

    API_URL +

    '?action=getFiles';

  const res =
    await fetch(url);

  const data =
    await res.json();

  const list =
    document.getElementById(
      'filesList'
    );

  list.innerHTML='';

  data.files.forEach(file=>{

    if(

      !file.fileName
        .toLowerCase()
        .includes(search)

    ){

      return;

    }

    list.innerHTML += `

      <div style="
        background:white;
        color:black;
        padding:10px;
        margin-bottom:10px;
        border-radius:10px;
      ">

        <b>
          ${file.fileName}
        </b>

        <br><br>

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

    `;

  });

}

function openFile(url){

  window.open(
    url,
    '_blank'
  );

}
