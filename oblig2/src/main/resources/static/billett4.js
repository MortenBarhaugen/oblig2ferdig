$(function() {
   hentAlle();
   hentTitler();
});

function hentTitler() {
    $.get("/hentTitler", function(data) {
        formaterTitler(data);
    });
}

function formaterTitler(data) {
    let ut = "<select id='valgtTittel'>";
    ut += "<option disabled>Velg tittel</option>";
    let forrigeTittel = "";
    for (const tittel of data) {
        if (tittel.tittel !== forrigeTittel) {
            ut += "<option>" + tittel.tittel + "</option>";
        }
        forrigeTittel = tittel.tittel;
    }
    ut += "</select>";
    $("#filmTittel").html(ut);
}

function regBilletter() {
    let inputFeil = false;

    if ($("#antall").val() <= 0) { //Sjekker om det finnes feil i noen av input-feltene
        $("#feilAntall").html("Feil antall!");
        inputFeil = true;
    }
    if ($("#fornavn").val().length === 0) {
        $("#feilFornavn").html("Skriv inn fornavn!");
        inputFeil = true;
    }
    if ($("#etternavn").val().length === 0) {
        $("#feilEtternavn").html("Skriv inn etternavn!");
        inputFeil = true;
    }  
    if ($("#telefonnr").val().length === 0) {
        $("#feilTelefonnr").html("Skriv inn telefonnr!");
        inputFeil = true;
    }
    if ($("#epost").val().length === 0) {
        $("#feilEpost").html("Skriv inn epost!");
        inputFeil = true;
    }

    if(!inputFeil) { // Hvis alle input-feltene har gyldige verdier registreres billetten
        const billett = {
            tittel : $("#titler").val(),
            antall : $("#antall").val(),
            fornavn : $("#fornavn").val(),
            etternavn : $("#etternavn").val(),
            telefonnr : $("#telefonnr").val(),
            epost : $("#epost").val(),
            tittel : $("#valgtTittel").val()
        }
        $.post("/lagre",billett,function(){
            hentAlle();
        });

        $("#antall").val(""); //tømmer input-feltene
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");

        $("#feilAntall").html(""); //Tømmer feilmeldingstekstene
        $("#feilFornavn").html("");
        $("#feilEtternavnnavn").html("");
        $("#feilTelefonnr").html("");
        $("#feilEpost").html("");
    }
};

function hentAlle() {
    $.get("/hentAlle", function(data) {
        formaterData(data);
    });
};

function formaterData(data){ //Skriver ut dataen fra input-feltene i en tabell
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th><th>Tittel</th>" +
        "</tr>";
    for(let i in data){
        ut+="<tr><td>"+data[i].antall+"</td><td>"+data[i].fornavn+"</td><td>"+data[i].etternavn+"</td><td>"+data[i].telefonnr+"</td><td>"+data[i].epost+"</td><td>" + data[i].tittel + "</td>"
    }
    $("#billettene").html(ut);
}

function slettBillettene() { //Sletter alle dataene
    $.get("/slettAlle", function() {
        hentAlle();
    });
};