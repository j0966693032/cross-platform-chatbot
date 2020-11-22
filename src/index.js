const { router, text, line, messenger } = require('bottender/router');
const handler = require('./handler')

exports.App = () => {
    return router([
        text(/^(hi|hello|help)$/i, handler.HandleFollow),
	    text(/^(排行榜)$/i, handler.RankFollow),
        text(/^(推薦的歌曲|推薦的音樂|推薦的歌手)$/i, handler.songFollow),

        line.message(handler.HandleLineMessage),
        line.follow(handler.HandleFollow),

        messenger.message(handler.HandleMessengerMessage),
        messenger.accountLinking(handler.HandleFollow),
    ]);
}
