const KKBOXMessage = require('./message/KKBOXMessage');
const kkbox = global.kkbox;
const kkassistant = global.kkassistant
var song = ["盧廣仲", "任然", "阿冗","八三夭", "黃鴻升", "陳昊森","陳零九", "夢然", "en","茄子蛋","井朧", "高爾宣", "吳青峰","于文文", "周興哲", "棉子","鄧紫棋", "周杰倫", "陳雪凝","李榮浩","玖壹意"];

const welcomeMessage ='您可以問我\n' + '排行榜 ； \n' + '推薦的歌曲' +
    '音樂：「播放告白氣球」；「播放自傳專輯的歌」；「我要聽鄉村音樂」；「我要聽日文新歌」\n' + 
    '音樂活動：「查詢高雄的活動」；「查詢吳卓源的演場會」；「查詢兩廳院的表演」\n' +
    '影音內容：「查詢影片進擊的巨人」；「查詢日劇半澤直樹」\n';


exports.HandleLineMessage = async context => {
    if(context.event.isText){
        kkassistant.nlu(context.event.text, context.session.id)
            .then(nluResp => {
                if (nluResp.directives.length > 0) {
                    if(nluResp.directives[0].type == 'AudioPlayer.Play') {
                        return kkbox.fetchTracks(nluResp.directives[0].playlist.data);
                    } else { // Event.Metadata & Video.Metadata
                        return nluResp.directives[0];
                    }
                }
                else {
                    console.error('Error: ', nluResp);
                    context.sendText(nluResp.outputSpeech.text);
                    throw new Error('KKBOX Assistant NLP Error');
                }
            })
            .then(items => new KKBOXMessage(items).toLineMessage())
            .then(({ altText, template }) => context.sendImageCarouselTemplate(altText, template))
            .catch(error => {
                console.error('Error: ', error);
            });
    }
}
exports.songFollow = async context => {
    kkassistant.nlu(song[Math.floor(Math.random()*21)], context.session.id)
            .then(nluResp => {
                if (nluResp.directives.length > 0) {
                    if(nluResp.directives[0].type == 'AudioPlayer.Play') {
                        return kkbox.fetchTracks(nluResp.directives[0].playlist.data);
                    } else { // Event.Metadata & Video.Metadata
                        return nluResp.directives[0];
                    }
                }
                else {
                    console.error('Error: ', nluResp);
                    context.sendText(nluResp.outputSpeech.text);
                    throw new Error('KKBOX Assistant NLP Error');
                }
            })
            .then(items => new KKBOXMessage(items).toLineMessage())
            .then(({ altText, template }) => context.sendImageCarouselTemplate(altText, template))
            .catch(error => {
                console.error('Error: ', error);
            });
}


exports.HandleLineMessage = async context => {
    if(context.event.isText){
        kkassistant.nlu(context.event.text, context.session.id)
            .then(nluResp => {
                if (nluResp.directives.length > 0) {
                    if(nluResp.directives[0].type == 'AudioPlayer.Play') {
                        return kkbox.fetchTracks(nluResp.directives[0].playlist.data);
                    } else { // Event.Metadata & Video.Metadata
                        return nluResp.directives[0];
                    }
                }
                else {
                    console.error('Error: ', nluResp);
                    context.sendText(nluResp.outputSpeech.text);
                    throw new Error('KKBOX Assistant NLP Error');
                }
            })
            .then(items => new KKBOXMessage(items).toLineMessage())
            .then(({ altText, template }) => context.sendImageCarouselTemplate(altText, template))
            .catch(error => {
                console.error('Error: ', error);
            });
    }
}

exports.HandleFollow = async context => {
    await context.sendText(welcomeMessage);
}

exports.RankFollow = async context => {
    await context.sendText(`https://kma.kkbox.com/charts/daily/song`); 
}

exports.HandleMessengerMessage = async context => {
    if (context.event.isText) {
        await context.sendText(`received the text message: ${context.event.text}`);
    }
}
