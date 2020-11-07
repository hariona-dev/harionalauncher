function refreshServerStatus() {
    var hariona_server = require('./assets/js/server_status');
    hariona_server.init('minecraft.hariona.fr', 25565, function(result) {
        if (hariona_server.online) {
            $("#server-hariona-players").html(hariona_server.current_players);
            $("#server-hariona-latency").html(hariona_server.latency);

            $("#server-total-players").html(hariona_server.current_players + " <i class=\"online\"></i>");
        }
        else
            $("#server-total-players").html("0 <i class=\"offline\"></i>");
    });
}