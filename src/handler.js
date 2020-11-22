const KKBOXMessage = require('./message/KKBOXMessage');
const kkbox = global.kkbox;
const kkassistant = global.kkassistant

const welcomeMessage ='您可以問我\n' + '排行榜 ； \n' +
    '音樂：「播放告白氣球」；「播放自傳專輯的歌」；「我要聽鄉村音樂」；「我要聽日文新歌」\n' + 
    '音樂活動：「查詢高雄的活動」；「查詢吳卓源的演場會」；「查詢兩廳院的表演」\n' +
    '影音內容：「查詢影片進擊的巨人」；「查詢日劇半澤直樹」\n';


exports.HandleLineMessage = async context => {
    if (context.event.isText) {
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

/*module.exports = class RankFollow{
   // await context.sendText(`https://kma.kkbox.com/charts/daily/song`); 
    toLineMessage() {    
        let template = this.data.events.slice(0, 10).map(el => {
            var url = encodeURI(el.url);
            return {
                imageUrl: `https://kma.kkbox.com/charts/assets/images/logo.svg?id=e41750806e78fa673556/600x600.jpg`,
                action: {
                    type: 'uri',
                    label: `${el.title}`.slice(0, 12),
                    uri: `https://kma.kkbox.com/charts/daily/song?terr=tw&lang=tc`,
                }
            }
        });
    }
}
*/
exports.HandleMessengerMessage = async context => {
    if (context.event.isText) {
        await context.sendText(`received the text message: ${context.event.text}`);
    }
}
