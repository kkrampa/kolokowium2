/* jshint browser: true, jquery: true, devel: true, unused: true */
$(function () {
    var img = $('img');
    var guzik = $('<button class="fa fa-filter"></button>');

    img.click(function (e) {
        var woj = [
            { woj: 'pomorskie', left: 173, top: 1, width: 152, height: 125 },
            { woj: 'warmińsko-mazurskie', left: 327, top: 44, width: 168, height: 102 },
            { woj: 'zachodnio-pomorskie', left: 16, top: 54, width: 143, height: 124 },
            { woj: 'podlaskie', left: 501, top: 79, width: 115, height: 171 },
            { woj: 'lubuskie', left: 26, top: 193, width: 89, height: 141 },
            { woj: 'wielkopolskie', left: 123, top: 215, width: 130, height: 123 },
            { woj: 'mazowieckie', left: 387, top: 167, width: 106, height: 205 },
            { woj: 'kujawsko-pomorskie', left: 206, top: 147, width: 138, height: 64 },
            { woj: 'łódzkie', left: 277, top: 285, width: 104, height: 101 },
            { woj: 'dolnośląskie', left: 56, top: 345, width: 140, height: 70 },
            { woj: 'lubelskie', left: 499, top: 289, width: 121, height: 151 },
            { woj: 'opolskie', left: 203, top: 395, width: 59, height: 81 },
            { woj: 'śląskie', left: 268, top: 399, width: 62, height: 156 },
            { woj: 'świętokrzyskie', left: 354, top: 389, width: 133, height: 69 },
            { woj: 'małopolskie', left: 332, top: 462, width: 121, height: 111 },
            { woj: 'podkarpackie', left: 458, top: 459, width: 109, height: 113 }
        ];
        var x = e.pageX - $(this).offset().left;
        var y = e.pageY - $(this).offset().top;
        var clickedWoj = woj.filter(function(el) {
            return el.left <= x && x <= el.left + el.width && el.top < y && el.top + el.height > y;
        })[0];
        $.ajax({
            url: '/api/' + clickedWoj.woj + '/',
            method: 'GET'
        }).done(function(data) {
            var lista = "<li>" + data.join("<li>");
            var $lista = $("#lista").find("ul");
            $lista.html(lista);
            guzik.off();
            guzik.click(function() {
                $.ajax({
                    url: '/api/' + clickedWoj.woj + '/' + $('#filtruj').val() + '/',
                    method: 'GET'
                }).done(function(data) {
                    var filteredList = "<li>" + data.join("<li>");
                    $lista.empty();
                    $lista.html(filteredList);
                    window.moveTo(0,0);
                });
            });
            if ($('#filtruj').length === 0) {
                $("#lista").append(guzik);
                $("#lista").append("<input type='text' id='filtruj' />");
            }
        });
    });

});
