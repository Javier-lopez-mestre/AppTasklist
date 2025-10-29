if (window.cordova) {
    document.addEventListener('deviceready', onDeviceReady, false);
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

} else {
    $(document).ready(onDeviceReady);
    console.log('App lista en navegador');
}

// document.addEventListener('deviceready', onDeviceReady, false);
// $(document).ready(onDeviceReady);


let $liActual = null; 
let tasques = [];

function onDeviceReady() {
    // console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // console.log('App lista en navegador');


    $("#modalTasca").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Afegir": function() {
                let tasca = $("#novaTasca").val().trim();
                if(tasca) {
                    creaTasca(tasca);
                    tasques.push(tasca);
                    desaTasques();
                    $("#novaTasca").val("");
                    desaTasques();
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
                    let index = $liActual.index();
                    tasques[index] = nouText;

                    $liActual.contents().filter(function() {
                        return this.nodeType === 3; 
                    }).first().replaceWith(nouText + " ");

                    desaTasques();
                }
                $(this).dialog("close");
            },
            "Cancel·lar": function() {
                $(this).dialog("close");
            }
        }
    });

    tasques = JSON.parse(localStorage.getItem("tasques")) || [];

    $('#tasques').empty();
    if (tasques.length === 0) {
        tasques = ["Tasca 1", "Tasca 2", "Tasca 3"];
        desaTasques();
    }

    tasques.forEach(text => creaTasca(text));
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
    let $li = $(caller).closest("li");
    let index = $li.index();

    tasques.splice(index, 1);
    desaTasques();

    $li.remove();
}

function editar(event) {
    $liActual = $(event.target).closest("li");

    let text = $liActual.contents().filter(function() {
        return this.nodeType === 3;
    }).text().trim();

    $("#textEdita").val(text);
    $("#modalEdita").dialog("open");
}

function desaTasques() {
    localStorage.setItem("tasques", JSON.stringify(tasques));
}