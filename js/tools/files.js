addHTML();

// pdf viewer
let pdf;
let canvas;
let isPageRendering;
let pageRenderingQueue = null;
let canvasContext;
let totalPages;
let currentPageNum = 1;

// events
function startFile(file, link, isPDF) {
    document.getElementById('breadcrumy').innerHTML =
        document.getElementById('breadcrumy').innerHTML +
        `
<li>
    <div class="flex items-center">
        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">${file}</a>
    </div>
</li>
            `;
    if (isPDF) {
        document.getElementById('pdf-viewer').style.display = 'block';
        startPDF(link);
    } else {
        document.getElementById('code-viewer').style.display = 'block';
        const request = new XMLHttpRequest();
        request.open('GET', link, true);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                const type = request.getResponseHeader('Content-Type');
                if (type.indexOf('text') !== 1) {
                    //alert(request.responseText);
                    document.getElementById('code_loc').innerHTML = request.responseText.replace(
                        '/\n/g',
                        '<br>'
                    );
                }
            }
        };
    }
}

function startPDF(link) {
    isPageRendering = false;
    pageRenderingQueue = null;
    canvas = document.getElementById('pdf_canvas');
    canvasContext = canvas.getContext('2d');

    initEvents();
    initPDFRenderer(link);
}

function initEvents() {
    canvas.oncontextmenu = (e) => e.preventDefault();

    let prevPageBtn = document.getElementById('prev_page');
    let nextPageBtn = document.getElementById('next_page');
    let goToPage = document.getElementById('go_to_page');
    console.log(prevPageBtn);
    prevPageBtn.addEventListener('click', renderPreviousPage);
    console.log(nextPageBtn);
    nextPageBtn.addEventListener('click', renderNextPage);
    console.log(goToPage);
    goToPage.addEventListener('click', goToPageNum);
}

// init when window is loaded
function initPDFRenderer(url) {
    let option = {url};

    pdfjsLib.getDocument(option).promise.then((pdfData) => {
        totalPages = pdfData.numPages;
        let pagesCounter = document.getElementById('total_page_num');
        pagesCounter.textContent = totalPages;
        // assigning read pdfContent to global variable
        pdf = pdfData;
        renderPage(currentPageNum);
    });
}

function renderPage(pageNumToRender = 1, scale = 1) {
    isPageRendering = true;
    document.getElementById('current_page_num').textContent = pageNumToRender;
    pdf.getPage(pageNumToRender).then((page) => {
        document.getElementById('loader').style.display = 'none';
        const viewport = page.getViewport({scale: 3});
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        let renderCtx = {canvasContext, viewport};
        page.render(renderCtx).promise.then(() => {
            isPageRendering = false;
            if (pageRenderingQueue !== null) {
                // this is to check of there is next page to be rendered in the queue
                renderPage(pageNumToRender);
                pageRenderingQueue = null;
            }
        });
    });
}

function renderPageQueue(pageNum) {
    if (pageRenderingQueue != null) {
        pageRenderingQueue = pageNum;
    } else {
        renderPage(pageNum);
    }
}

function renderNextPage(ev) {
    if (currentPageNum >= totalPages) {
        currentPageNum = 0;
    }
    currentPageNum++;
    renderPageQueue(currentPageNum);
}

function renderPreviousPage(ev) {
    if (currentPageNum <= 1) {
        currentPageNum = totalPages + 1;
    }
    currentPageNum--;
    renderPageQueue(currentPageNum);
}

function goToPageNum(ev) {
    let numberInput = document.getElementById('page_num');
    let pageNumber = parseInt(numberInput.value);
    if (pageNumber) {
        if (pageNumber <= totalPages && pageNumber >= 1) {
            currentPageNum = pageNumber;
            numberInput.value = '';
            renderPageQueue(pageNumber);
            return;
        }
    }
    numberInput.value = '';
}

// video player
// load the library and ALL languages
// hljs = require('highlight.js');
// html = hljs.highlightAuto('<h1>Hello World!</h1>').value
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
    });
});
setInterval(function () {
    document.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
    });
}, 5000);

// Possible improvements:
// - Change timeline and volume slider into input sliders, reskinned
// - Change into Vue or React component
// - Be able to grab a custom title instead of "Music Song"
// - Hover over sliders to see preview of timestamp/volume change

const audioPlayer = document.querySelector('.audio-player');
const audio = new Audio(
    'https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3'
);
//credit for song: Adrian kreativaweb@gmail.com

console.dir(audio);

audio.addEventListener(
    'loadeddata',
    () => {
        audioPlayer.querySelector('.time .length').textContent = getTimeCodeFromNum(audio.duration);
        audio.volume = 0.75;
    },
    false
);

//click on timeline to skip around
const timeline = audioPlayer.querySelector('.timeline');
timeline.addEventListener(
    'click',
    (e) => {
        const timelineWidth = window.getComputedStyle(timeline).width;
        const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
        audio.currentTime = timeToSeek;
    },
    false
);

//click volume slider to change volume
const volumeSlider = audioPlayer.querySelector('.controls .volume-slider');
volumeSlider.addEventListener(
    'click',
    (e) => {
        const sliderWidth = window.getComputedStyle(volumeSlider).width;
        const newVolume = e.offsetX / parseInt(sliderWidth);
        audio.volume = newVolume;
        audioPlayer.querySelector('.controls .volume-percentage').style.width =
            newVolume * 100 + '%';
    },
    false
);

//check audio percentage and update time accordingly
setInterval(() => {
    const progressBar = audioPlayer.querySelector('.progress');
    progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
    audioPlayer.querySelector('.time .current').textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector('.controls .toggle-play');
playBtn.addEventListener(
    'click',
    () => {
        if (audio.paused) {
            playBtn.classList.remove('play');
            playBtn.classList.add('pause');
            audio.play();
        } else {
            playBtn.classList.remove('pause');
            playBtn.classList.add('play');
            audio.pause();
        }
    },
    false
);

audioPlayer.querySelector('.volume-button').addEventListener('click', () => {
    const volumeEl = audioPlayer.querySelector('.volume-container .volume');
    audio.muted = !audio.muted;
    if (audio.muted) {
        volumeEl.classList.remove('icono-volumeMedium');
        volumeEl.classList.add('icono-volumeMute');
    } else {
        volumeEl.classList.add('icono-volumeMedium');
        volumeEl.classList.remove('icono-volumeMute');
    }
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = seconds / 60;
    seconds -= minutes * 60;
    const hours = minutes / 60;
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;

    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

function addHTML() {
    document.body.innerHTML += `
<div id="pdf-viewer" style="display:none;">
    <style>
        canvas {
            width: 100%;
            border: 3px solid transparent;
            border-radius: 10px;
        }

        .container {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            background: #121926;
            width: 90%;
            margin-left: 5%;
            border-radius: 10px;
            padding: 10px;
            text-align: center;
        }
    </style>

    <div id="loader" class="text-black dark:text-white">Loading ......</div>
    <div class="container">
        <button id="prev_page" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium
         rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Previous Page
        </button>
        <button id="next_page" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium
         rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Next Page
        </button>
        <span class="text-white dark:text-white">
        <span class="text-red-500" id="current_page_num"></span>
        of
        <span id="total_page_num"></span>
    </span>

        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               style="width:150px;margin-left:10px; margin-right:10px; display:inline-block;" type="text"
               id="page_num">
        <button id="go_to_page" type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Go to Page
        </button>
    </div>
    <canvas id="pdf_canvas"></canvas>
</div>


    <div id="code-viewer" style="display:none;">
        <pre onClick="this.contentEditable='true';" style="width:80%;border-radius:10px;margin-left:10%;">
        <code id="code_loc" onClick="this.contentEditable='true';"
              style="border-radius:10px; background:#1F2937;color:white;"
              class="language-python">
        </code>
    </pre>
        <style>
            /* Hide scrollbar for Chrome, Safari and Opera */
            code::-webkit-scrollbar {
                display: none;
            }

            /* Hide scrollbar for IE, Edge and Firefox */
            code {
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
            }
        </style>
    </div>
    <div id="video-viewer" style="display:none; ">
        <link href="https://vjs.zencdn.net/7.18.1/video-js.css" rel="stylesheet"/>
        <link href="https://unpkg.com/video.js@7/dist/video-js.min.css" rel="stylesheet"/>
        <link href="https://unpkg.com/@videojs/themes@1/dist/fantasy/index.css" rel="stylesheet"/>
        <video id="my-video" class="video-js vjs-theme-fantasy" controls preload="auto" width="640" height="264"
               data-setup="{}"
               poster="https://media.discordapp.net/attachments/951319765820002384/956401024162217984/adexportnebulus.ml.mp4?format=jpeg&width=800&height=450">

            <source src="https://cdn.discordapp.com/attachments/951319765820002384/956401024162217984/adexportnebulus.ml.mp4"
                    type="video/mp4"/>

            <source src="https://cdn.discordapp.com/attachments/951319765820002384/956401024162217984/adexportnebulus.ml.mp4"
                    type="video/webm"/>

            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
            </p>
        </video>

        <script src="https://vjs.zencdn.net/7.18.1/video.min.js"></script>
    </div>

    <div id="office-viewer" style="display:none; ">
        <iframe src="https://docs.google.com/gview?url=http://writing.engr.psu.edu/workbooks/formal_report_template.doc&embedded=true"
                width='95%' height='100%'></iframe>
        <iframe src='https://view.officeapps.live.com/op/embed.aspx?src=http://writing.engr.psu.edu/workbooks/formal_report_template.doc'
                width='95%' height='100%' frameborder='0'>
            This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by
            <a target='_blank' href='http://office.com/webapps'>Office Online</a>.
        </iframe>
    </div>
    <div id="audio-viewer" style="display:none;">
        <div style="width: 50px; height: 50px;"></div>
        <div class="audio-player">
            <div class="timeline">
                <div class="progress"></div>
            </div>
            <div class="controls">
                <div class="play-container">
                    <div class="toggle-play play">
                    </div>
                </div>
                <div class="time">
                    <div class="current">0:00</div>
                    <div class="divider">/</div>
                    <div class="length"></div>
                </div>
                <div class="name">Music Song</div>
                <!--     credit for icon to https://saeedalipoor.github.io/icono/ -->
                <div class="volume-container">
                    <div class="volume-button">
                        <div class="volume icono-volumeMedium"></div>
                    </div>

                    <div class="volume-slider">
                        <div class="volume-percentage"></div>
                    </div>
                </div>
            </div>
        </div>
        <style>
            .audio-player {
                height: 50px;
                width: 350px;
                background: #444;
                box-shadow: 0 0 20px 0 #000a;
                font-family: arial,serif;
                color: white;
                font-size: 0.75em;
                overflow: hidden;
                display: grid;
                grid-template-rows: 6px auto;
            }

            .audio-player .timeline {
                background: white;
                width: 100%;
                position: relative;
                cursor: pointer;
                box-shadow: 0 2px 10px 0 #0008;
            }

            .audio-player .timeline .progress {
                background: coral;
                width: 0;
                height: 100%;
                transition: 0.25s;
            }

            .audio-player .controls {
                display: flex;
                justify-content: space-between;
                align-items: stretch;
                padding: 0 20px;
            }

            .audio-player .controls > * {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .audio-player .controls .toggle-play.play {
                cursor: pointer;
                position: relative;
                left: 0;
                height: 0;
                width: 0;
                border: 7px solid #0000;
                border-left: 13px solid white;
            }

            .audio-player .controls .toggle-play.play:hover {
                transform: scale(1.1);
            }

            .audio-player .controls .toggle-play.pause {
                height: 15px;
                width: 20px;
                cursor: pointer;
                position: relative;
            }

            .audio-player .controls .toggle-play.pause:before {
                position: absolute;
                top: 0;
                left: 0;
                background: white;
                content: "";
                height: 15px;
                width: 3px;
            }

            .audio-player .controls .toggle-play.pause:after {
                position: absolute;
                top: 0;
                right: 8px;
                background: white;
                content: "";
                height: 15px;
                width: 3px;
            }

            .audio-player .controls .toggle-play.pause:hover {
                transform: scale(1.1);
            }

            .audio-player .controls .time {
                display: flex;
            }

            .audio-player .controls .time > * {
                padding: 2px;
            }

            .audio-player .controls .volume-container {
                cursor: pointer;
                position: relative;
                z-index: 2;
            }

            .audio-player .controls .volume-container .volume-button {
                height: 26px;
                display: flex;
                align-items: center;
            }

            .audio-player .controls .volume-container .volume-button .volume {
                transform: scale(0.7);
            }

            .audio-player .controls .volume-container .volume-slider {
                position: absolute;
                left: -3px;
                top: 15px;
                z-index: -1;
                width: 0;
                height: 15px;
                background: white;
                box-shadow: 0 0 20px #000a;
                transition: 0.25s;
            }

            .audio-player .controls .volume-container .volume-slider .volume-percentage {
                background: coral;
                height: 100%;
                width: 75%;
            }

            .audio-player .controls .volume-container:hover .volume-slider {
                left: -123px;
                width: 120px;
            }
        </style>
    </div>`;
}
