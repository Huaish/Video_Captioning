
async function getCaption(video_id) {
    console.log(video_id)
    console.log('getCaption() called');
    var bar = document.getElementById('js-progressbar');
    // video_id = 'v_lVu-4SKcb4c'
    const response = await fetch('/caption/' + video_id);
    const data = await response.json();
    console.log(data);

    const captionContainer = document.getElementById('caption');
    data.forEach((obj) => {
        const divElement = document.createElement('div');
        divElement.innerHTML = `
            <p>Sentence: ${obj.sentence}</p>
            <p>Timestamp: ${obj.timestamp}</p>
            <p>GT Sentence: ${obj.gt_sentence}</p>
        `;
        captionContainer.appendChild(divElement);
    });
    bar.style.display = 'none'; // 初始化时隐藏进度条
    UIkit.modal('#my-id').show();
    // document.getElementById('caption').innerHTML = data[0];
}

UIkit.util.ready(function () {
    var bar = document.getElementById('js-progressbar');

    var animate = setInterval(function () {

        bar.value += 5;

        if (bar.value >= bar.max) {
            clearInterval(animate);
        }

    }, 1500);

});