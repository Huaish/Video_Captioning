

async function getCaption() {
    console.log('getCaption() called');
    video_id = 'v_lVu-4SKcb4c'
    const response = await fetch('/caption/' + video_id);
    const data = await response.json();
    console.log(data);
    // document.getElementById('caption').innerHTML = data.caption;
}