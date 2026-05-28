const params =
  new URLSearchParams(
    window.location.search
  );

const url =
  params.get('url');

const type =
  params.get('type');

const viewer =
  document.getElementById(
    'viewer'
  );

/*
========================
PDF
========================
*/

if(
  type.includes('pdf')
){

  const fileId =
    extractFileId(url);

  viewer.innerHTML = `

    <iframe
      src="
        https://drive.google.com/file/d/${fileId}/preview
      "
      allow="autoplay"
    ></iframe>

  `;

}

/*
========================
IMAGE
========================
*/

else{

  const fileId =
    extractFileId(url);

  viewer.innerHTML = `

    <img
      src="
        https://drive.google.com/thumbnail?id=${fileId}&sz=w2000
      "
    >

  `;

}

/*
========================
EXTRACT FILE ID
========================
*/

function extractFileId(url){

  const match =
    url.match(/[-\w]{25,}/);

  return match
    ? match[0]
    : '';

}

/*
========================
ANTI RIGHT CLICK
========================
*/

document.addEventListener(
  'contextmenu',
  e => e.preventDefault()
);
