$(document).ready(function() {
    (function sprawdzWiadomosci() {
        seconds = 0;
        if (typeof liczbaWiadomosciCzas !== 'undefined') {
            seconds = (new Date().getTime() - new Date(liczbaWiadomosciCzas.date).getTime()) / 1000;
        }
        //wywolanie ajax tylko jesli nie pobrano jeszcze wiadomosci - potem co 10 minut
        if (typeof liczbaWiadomosciCzas == 'undefined' || seconds > 600)
            $.ajax({
                url: 'AJAX.php',
                data: {dz: 'liczba_wiadomosci'},
                dataType: 'json',
                type: 'get',
                success: function(result) {
                    //ustawić liczbę wiadomości użytkownika <span id=#messageCount
                    $('#messageCount').html('(' + result['liczbaWiad'] + ')');
                },
                error: function() {
                    console.log("error API modułu komunikacyjnego nie odpowiada - brak liczby wiadomosci");
                }
            });
    })();
    
    (function sprawdzKlaserLicencja() {
        //wywolanie ajax tylko jesli nie sprawdzano jeszcze licencji
        if (typeof klaserLicencja == 'undefined') {//brak licencji w sesji
            //console.log('sprawdzam licencję klaser');
            $.ajax({
                url: 'AJAX.php',
                data: {dz: 'klaser_licencja'},
                dataType: 'json',
                type: 'get',
                success: function (result) {
                    //ok zapisano w sesji (AJAX.php
                },
                error: function () {
                    console.log("error MEDWSKlientAPI - nie można sprawdzić licencji Klasera");
                }
            });
        }else{
            //console.log('licencja klasera: '+klaserLicencja)
        }
    })();
});
