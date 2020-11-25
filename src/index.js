const { router, text, line, messenger } = require('bottender/router');
const handler = require('./handler')

exports.App = () => {
    return router([
        text(/^(help|heal )$/i, handler.help),
        text(/^(hi|hello)$/i, handler.HandleFollow),
	    text(/^(今日排行榜)$/i, handler.recentday),
	    text(/^(本周排行榜)$/i, handler.recentweek),
	    text(/^(年度排行榜)$/i, handler.rank),
        text(/^(推薦的歌曲|推薦的音樂|推薦的歌手)$/i, handler.Fsong),

        line.message(handler.HandleLineMessage),
        line.follow(handler.HandleFollow),

        messenger.message(handler.HandleMessengerMessage),
        messenger.accountLinking(handler.HandleFollow),
    ]);
}
