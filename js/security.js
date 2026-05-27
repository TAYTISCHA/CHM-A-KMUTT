function getDeviceId(){

  let deviceId = localStorage.getItem('deviceId');

  if(!deviceId){

    deviceId = crypto.randomUUID();

    localStorage.setItem(
      'deviceId',
      deviceId
    );
  }

  return deviceId;
}

document.addEventListener('contextmenu', e=>{
  e.preventDefault();
});

document.addEventListener('keydown', e=>{

  if(
    e.key === 'F12' ||
    (
      e.ctrlKey &&
      e.shiftKey &&
      e.key === 'I'
    )
  ){
    e.preventDefault();
  }

});
