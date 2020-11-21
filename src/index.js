const { router, text, line, messenger } = require('bottender/router');
const handler = require('./handler')

<html>
<meta charset="utf8" />
</html>

exports.App = () => {
    return router([
        text(/^(hi|hello|help)$/i, handler.HandleFollow),
	text(/^(排行榜)$/i, handler.RankFollow),

        line.message(handler.HandleLineMessage),
        line.follow(handler.HandleFollow),

        messenger.message(handler.HandleMessengerMessage),
        messenger.accountLinking(handler.HandleFollow),
    ]);
}
