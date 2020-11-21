const { router, text, line, messenger } = require('bottender/router');
const handler = require('./handler')

<script type="text/javascript" language="javascript" src="output.js" charset="big5">
</script>

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
