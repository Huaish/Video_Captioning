
async function getCaption(video_id) {
    const bar = document.getElementById('js-progressbar');
    const captionContainer = document.getElementById('caption');
    captionContainer.innerHTML = '';
    bar.style.display = 'block';
    bar.value = 0;
    var animate = setInterval(function () {

        bar.value += 3;

        if (bar.value >= bar.max) {
            clearInterval(animate);
        }

    }, 1500);
    console.log(video_id)
    console.log('getCaption() called');
    const response = await fetch('/caption/' + video_id);
    const data = await response.json();
    console.log(data);

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
}

async function fetchVideoIds() {
    const response = await fetch('/video_ids');
    const data = await response.json();
    const videoIds = data.video_ids;

    const dropdownContainer = document.querySelector('.uk-dropdown-nav');

    videoIds.forEach((videoId) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.innerText = videoId;
        link.setAttribute('uk-toggle', 'target: #my-id');
        link.onclick = function() {
            getCaption(videoId);
        };
        listItem.appendChild(link);
        dropdownContainer.appendChild(listItem);
    });
}

fetchVideoIds();