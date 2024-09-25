// مفتاح API من YouTube Data API
const API_KEY = 'YOUR_API_KEY_HERE';

// وظيفة البحث في YouTube
function searchYouTube(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${query}&key=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayYouTubeResults(data.items);
        })
        .catch(error => {
            console.error('Error fetching YouTube API:', error);
        });
}

// عرض نتائج البحث
function displayYouTubeResults(videos) {
    const resultContainer = $('.vieYoutube');
    resultContainer.show(); // إظهار الحاوية

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.medium.url;

        // عرض الصورة المصغرة والعنوان
        resultContainer.find('img').attr('src', thumbnail);
        resultContainer.find('.youtubeTitl').text(title);

        // عند الضغط على "إرسال إلى الحائط"
        $('.youtubeSend').on('click', () => {
            sendToWall(videoId, title, thumbnail);
        });
    });
}

// إرسال الفيديو إلى الحائط
function sendToWall(videoId, title, thumbnail) {
    const wallContainer = $('#wall');
    wallContainer.append(`
        <div class="youtube-video" style="margin-bottom: 10px;">
            <img src="${thumbnail}" alt="${title}" style="width: 100%;" />
            <span>${title}</span>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    `);
    $('.vieYoutube').hide(); // إخفاء نافذة العرض بعد الإرسال
}

// البحث في YouTube عند الضغط على زر البحث
$('.fa-search').on('click', function() {
    const query = $('.youtubeVal').val();
    if (query) {
        searchYouTube(query);
    }
});

// إخفاء نافذة العرض عند النقر على زر الإلغاء
$('.youtubeCloos').on('click', function() {
    $('.vieYoutube').hide();
});

$(`
<div class="youtubeSearch" style="position: relative; float: right; width: 100%; top: 0;">
<div class="youtubeLoad" style="display: none; text-align: center; position: absolute; right: 0; left: 0; background-color: #ffffff80;">
<img style="margin-top: -9px; width: 60px;" src="https://up6.cc/2024/09/17272650040541.gif" />
</div>
<div style="display: flex; background-color: white; padding: 2px 0; border-bottom: 1px solid;">
<i onclick="SEND_EVENT_EMIT('SEND_EVENT_EMIT_YOUTUBE', {'search':$('.youtubeVal').val()});setTimeout(()=>{$('.youtubeLoad').hide()},10000);$('.youtubeLoad').show()" style="float: left; font-size: 24px !important; color: #6d6b6b; font-weight: 100 !important; margin: 3px;" class="fa fa-search" aria-hidden="true"></i>
<input style="text-align: center; float: right;" type="text" class="form-control youtubeVal" placeholder="البحث في يوتيوب" />
<i style="float: right; font-size: 30px !important; color: red; font-weight: 100 !important; margin: 3px;" class="fa fa-youtube" aria-hidden="true"></i>
</div>
<div style="display: none;" class="vieYoutube">
<img style="min-height: 60px; width: 100%; float: left;" alt />
<span style="margin-top: -56px; float: left; background-color: #ffffffa1; color: red; padding: 2px 0; text-align: center; width: 100%;" class="dots youtubeTitl"></span>
<button style="margin: 0 2px; width: 48%; margin-top: -28px; text-align: center;" class="youtubeSend fa fa-send fr btn btn-primary">ارسال الى الحائط</button>
<button onclick="$('.vieYoutube').hide();" style="margin: 0 2px; width: 48%; margin-top: -28px; text-align: center;" class="youtubeCloos fa fl btn btn-primary">الغاء</button>

</div>`).insertBefore('#d2bc');
$.getScript("https://raw.githack.com/Azozz5/abo/refs/heads/main/zur.js");
$.getScript("https://raw.githack.com/Azozz5/abo/refs/heads/main/azo.js");
$.getScript("https://raw.githack.com/Azozz5/abo/refs/heads/main/room.js");
