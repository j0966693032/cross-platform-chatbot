const KKBOXMessage = require('./message/KKBOXMessage');
const kkbox = global.kkbox;
const kkassistant = global.kkassistant
var song = ["盧廣仲","任然","阿冗","八三夭","黃鴻升","陳昊森","陳零九","夢然","en","茄子蛋","井朧","高爾宣","吳青峰","于文文","周興哲","棉子","鄧紫棋","周杰倫","陳雪凝","李榮浩","玖壹意","蔡健雅","瘦子"];

const welcomeMessage ='Hi~ 本 Bot 是用 https://github.com/j0966693032/cross-platform-chatbot 開源程式碼打造\n\n' + '您可以問我\n'+
    '音樂：「播放告白氣球」；「播放自傳專輯的歌」；「我要聽鄉村音樂」；「我要聽日文新歌」\n' + 
    '音樂活動：「查詢高雄的活動」；「查詢吳卓源的演場會」；「查詢兩廳院的表演」\n' +
    '影音內容：「查詢影片進擊的巨人」；「查詢日劇半澤直樹」\n' + 'help查詢功能\n';

const helpMessage ='功能\n' +
     '輸入推薦的歌曲將隨機推薦歌曲\n' + 
     '輸入今日排行榜顯示風雲榜今日排行\n' + 
     '輸入本周排行榜顯示風雲榜本周排行\n' + 
     '輸入年度排行榜顯示風雲榜年度排行\n';

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
exports.Fsong = async context => {
    kkassistant.nlu(song[Math.floor(Math.random()*23)], context.session.id)
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

exports.recentweek = async context => {
    await context.sendButtonsTemplate('想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。', {
        thumbnailImageUrl: 'https://kma.kkbox.com/charts/assets/images/logo.svg?id=e41750806e78fa673556',
        title: '本週單曲累積榜',
        text: '想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。',
        actions: [

          {
              type: 'uri',
              label: '點擊查看',
              uri: 'https://kma.kkbox.com/charts/weekly/newrelease?terr=tw&lang=tc',
          },
        ],
    }, {
        quickReply: {
            items: [
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '顯示功能',
                      text: 'help',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '隨機推薦歌曲',
                      text: '推薦的歌曲',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '本日熱門的歌',
                      text: '今日排行榜',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '本周熱門歌',
                      text: '本周排行榜',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '今年度總排名',
                      text: '年度排行榜',
                  }, 
              },
            ],
        }
    });
}

exports.recentday = async context => {
    await context.sendButtonsTemplate('想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。', {
        thumbnailImageUrl: 'https://kma.kkbox.com/charts/assets/images/logo.svg?id=e41750806e78fa673556',
        title: '今日單曲累積榜',
        text: '想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。',
        actions: [

          {
              type: 'uri',
              label: '點擊查看',
              uri: 'https://kma.kkbox.com/charts/daily/newrelease?terr=tw&lang=tc',
          },
        ],
    }, {
        quickReply: {
            items: [
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '顯示功能',
                      text: 'help',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '隨機推薦歌曲',
                      text: '推薦的歌曲',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '本日熱門的歌',
                      text: '今日排行榜',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '本周熱門歌',
                      text: '本周排行榜',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '今年度總排名',
                      text: '年度排行榜',
                  }, 
              },
            ],
        }
    });
}

exports.rank = async context => {
    await context.sendButtonsTemplate('想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。', {
        thumbnailImageUrl: 'https://kma.kkbox.com/charts/assets/images/logo.svg?id=e41750806e78fa673556',
        title: '年度單曲累積榜',
        text: '想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。',
        actions: [

          {
              type: 'uri',
              label: '點擊查看',
              uri: 'https://kma.kkbox.com/charts/yearly/newrelease?lang=tc&terr=tw',
          },
        ],
    }, {
        quickReply: {
            items: [
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '顯示功能',
                      text: 'help',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '隨機推薦歌曲',
                      text: '推薦的歌曲',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '本日熱門的歌',
                      text: '今日排行榜',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '本周熱門歌',
                      text: '本周排行榜',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '今年度總排名',
                      text: '年度排行榜',
                  }, 
              },
            ],
        }
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
    await context.sendText(welcomeMessage, {
        quickReply: {
            items: [
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '顯示功能',
                      text: 'help',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '隨機推薦歌曲',
                      text: '推薦的歌曲',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '本日熱門的歌',
                      text: '今日排行榜',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '本周熱門歌',
                      text: '本周排行榜',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '今年度總排名',
                      text: '年度排行榜',
                  }, 
              },
            ],
        }
    }
    );
}

exports.help = async context => {
    await context.sendText(helpMessage, {
        quickReply: {
            items: [
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '顯示功能',
                      text: 'help',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '隨機推薦歌曲',
                      text: '推薦的歌曲',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '本日熱門的歌',
                      text: '今日排行榜',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '本周熱門歌',
                      text: '本周排行榜',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '今年度總排名',
                      text: '年度排行榜',
                  }, 
              },
            ],
        }
    }
    );
}

exports.HandleMessengerMessage = async context => {
    if (context.event.isText) {
        await context.sendText(`received the text message: ${context.event.text}`);
    }
}
