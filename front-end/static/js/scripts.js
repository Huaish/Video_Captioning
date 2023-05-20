
async function getCaption(video_id) {
    console.log(video_id)
    console.log('getCaption() called');
    var bar = document.getElementById('js-progressbar');
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
    bar.style.display = 'none';
    UIkit.modal('#my-id').show();
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