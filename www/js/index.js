document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    $("#modalTasca").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Afegir": function() {
                let tasca = $("#novaTasca").val().trim();
                if(tasca) {
                    $("#tasques").append($("<li>").text(tasca));
                    $("#novaTasca").val("");
                    $(this).dialog("close");
                }
            },
            "Cancel·lar": function() {
                $(this).dialog("close");
            }
        }
    });

    $("#afegirTasca").click(function() {
        $("#modalTasca").dialog("open");
    });
}
