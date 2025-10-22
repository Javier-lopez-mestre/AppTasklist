document.addEventListener('deviceready', onDeviceReady, false);

let $liActual = null; 

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    $("#modalTasca").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Afegir": function() {
                let tasca = $("#novaTasca").val().trim();
                if(tasca) {
                    creaTasca(tasca);
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

    $("#modalEdita").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "OK": function() {
                let nouText = $("#textEdita").val().trim();
                if(nouText && $liActual) {
                    $liActual.contents().filter(function() {
                        return this.nodeType === 3; 
                    }).first().replaceWith(nouText + " ");
                }
                $(this).dialog("close");
            },
            "Cancel·lar": function() {
                $(this).dialog("close");
            }
        }
    });

    let tasquesInicials = ["Tasca 1", "Tasca 2", "Tasca 3"];
    $("#tasques").empty(); 

    tasquesInicials.forEach(text => {
        creaTasca(text);
    });
}

function creaTasca(text) {
    let $li = $("<li>").text(text + " ");

    let $btnEditar = $("<button>")
        .text("Edita")
        .addClass("boto_edita")
        .click(editar);

    let $btnEliminar = $("<button>")
        .text("Elimina")
        .addClass("boto_eliminar")
        .click(elimina);

    $li.append($btnEditar).append(" ").append($btnEliminar);
    $("#tasques").append($li);
}

function elimina(event) {
    let caller = event.target || event.srcElement;
    $(caller).closest("li").remove();
}

function editar(event) {
    $liActual = $(event.target).closest("li");

    let text = $liActual.contents().filter(function() {
        return this.nodeType === 3;
    }).text().trim();

    $("#textEdita").val(text);
    $("#modalEdita").dialog("open");
}
