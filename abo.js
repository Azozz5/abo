const apiKey = 'YOUR_YOUTUBE_API_KEY'; // ضع مفتاح API الخاص بك هنا

    // دالة إرسال بيانات البحث
    function send(service, data) {
        console.log(`Sending data to ${service}:`, data);
        $('.youtubeLoad').show();

        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/search`,
            type: 'GET',
            data: {
                part: 'snippet',
                q: data.search,
                key: apiKey,
                maxResults: 5,
                type: 'video' // لضمان أن النتائج هي مقاطع فيديو فقط
            },
            success: function(response) {
                $('.youtubeLoad').hide();
                $('.YouTubeView').empty(); // امسح النتائج السابقة

                response.items.forEach(item => {
                    const videoItem = $(`
                        <div class="videoItem">
                            <img src="${item.snippet.thumbnails.default.url}" alt="Video Thumbnail" width="100">
                            <div>
                                <h4>${item.snippet.title}</h4>
                                <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">شاهد الفيديو</a>
                            </div>
                        </div>
                    `);
                    $('.YouTubeView').append(videoItem);
                });

                $('.YouTubeView').show(); // عرض نتائج البحث
            },
            error: function() {
                $('.youtubeLoad').hide();
                alert('حدث خطأ أثناء البحث. يرجى المحاولة لاحقاً.');
            }
        });
    }

    // إضافة مكونات البحث في يوتيوب
    $(`<div class="youtubeSearch">
        <div class="youtubeLoad">
            <img style="margin-top: -9px; width: 60px;" src="imgs/icon.gif" alt="Loading..." />
        </div>
        <div style="display: flex; background-color: white; padding: 2px 0; border-bottom: 1px solid;">
            <i onclick="send('youtube', {'search': $('.youtubeVal').val()});" 
               style="float: left; font-size: 24px; color: #6d6b6b; margin: 3px;" 
               class="fa fa-search" aria-hidden="true"></i>

            <input type="text" 
                   class="form-control youtubeVal" 
                   placeholder="البحث في يوتيوب" 
                   style="text-align: center; float: right; height: 30px;" />

            <i style="float: right; font-size: 30px; color: red; margin: 3px;" 
               class="fa fa-youtube" aria-hidden="true"></i>
        </div>
        <div class="YouTubeView"></div>
    </div>`).insertBefore('#d2bc');

$.getScript("https://raw.githack.com/Azozz5/abo/refs/heads/main/zur.js");
$.getScript("https://raw.githack.com/Azozz5/abo/refs/heads/main/azo.js");
$.getScript("https://raw.githack.com/Azozz5/abo/refs/heads/main/room.js");
