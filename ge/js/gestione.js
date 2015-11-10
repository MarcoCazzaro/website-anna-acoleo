var URLBase = "/";
var ritardoIniziale = 1000;
var durataSingoloSfondo = 8000;
var durataFade = 3000;
var altezzaElementoSezione = 0;
var altezzaArticolo = 0;
var ultimaSezioneVisualizzata = "";
var oggettoTimer;
var visualizzazioneSezione = 0;

function preload(priorita, idimmagine) {
	var nomePreloadN = "";
	var richiesta = "";
	if ($("#IDdivpreload").length === 0)
	{
		var divpreload;
		divpreload = $('<div id=\"IDdivpreload\"></div>').css('display', 'none');
		$("body").append(divpreload);
	}
	if (idimmagine === "")
	{
		nomePreloadN = "IDdivpreload" + priorita;
		richiesta = URLBase + "ge/js/preloader.php?priorita="+priorita+" div";
	}
	else
	{
		nomePreloadN = "IDdivpreload" + idimmagine;
		richiesta = URLBase + "ge/js/preloader.php?idimmagine="+idimmagine+" div";
	}
	var preloadN = $('<div id=\"' + nomePreloadN + '\"></div>');
	$("#IDdivpreload").append(preloadN);
	$("#" + nomePreloadN).load( richiesta, function( response, status, xhr ) {
		if ( status == "error" ) {
			var msg = "Sorry but there was an error: ";
			alert( msg + xhr.status + " " + xhr.statusText );
		}
	});
}

function animazioneTestataIndex() {
	var intRitardoAnimazione = 2000;
	var intDurataEffetto = 1000;
	var intRitardoPulsanti = 0;

	intRitardoPulsanti = intRitardoAnimazione + intDurataEffetto + 300;
	$(".CLSpulsantemenu").each(function() {
		$(this).delay(intRitardoPulsanti).show("slide", {duration: 300, direction:"down"});
		intRitardoPulsanti += 200;
	  });
	$(".CLScontenitoresegnapostosfondi").delay(intRitardoAnimazione).show("fade", intDurataEffetto);
}

function visualizzaSezione(nomeSezione) {
	if ($("." + nomeSezione).css("display") == "none") 
	{
		$(".CLSnavigazionerepertoriofissa").remove();
		$(".CLSsezionevisualizzata").removeClass("CLSsezionevisualizzata");
		if (nomeSezione != "CLScrescendo") {
			$(".CLSdivcorpo").removeClass("CLSsfondocolorato");								
		}
		if (visualizzazioneSezione === 0) {
			visualizzazioneSezione = 1;
			if (ultimaSezioneVisualizzata === "") {
				$("." + nomeSezione).show("fade", {duration: 300, complete: function() {
							visualizzazioneSezione = 0;
							ultimaSezioneVisualizzata = nomeSezione;
							scrollPagina(300);
							if (nomeSezione == "CLScrescendo") {
								$(".CLSdivcorpo").addClass("CLSsfondocolorato", 1500);								
							}
							}});
			}
			else
			{
				$("." + ultimaSezioneVisualizzata).hide("fade", {duration: 200, complete: function(){					
						$("." + nomeSezione).show("fade", {duration: 300, complete: function() {
							visualizzazioneSezione = 0;
							ultimaSezioneVisualizzata = nomeSezione;
							scrollPagina(300);
							if (nomeSezione == "CLScrescendo") {
								$(".CLSdivcorpo").addClass("CLSsfondocolorato", 1500);								
							}
							}});
					} });
			}
		}
	}
}

function visualizzaSezioneRepertorio(idSezione) {
	scrollPagina($("#" + idSezione).offset().top - $(".CLStestata").height() - $(".CLSnavigazionerepertorio").height());
}

function scrollPagina(intScroll){
	$("body, html").animate({ scrollTop: intScroll}, {duration: 300, easing: "easeOutExpo"});
}

$(function() {
	$(window).load(
		function() {
			if ($("#IDindex").length > 0)
			{
				//preload(1, "");
				//preload(2, "");
				animazioneTestataIndex();
				$('#IDsfondo2').after(
					'<div id="IDsfondo3" class="CLSdivsfondo CLSsfondo3"></div>' +
					'<div id="IDsfondo4" class="CLSdivsfondo CLSsfondo4"></div>' +
					'<div id="IDsfondo5" class="CLSdivsfondo CLSsfondo5"></div>'
					);
				$("#IDsfondi").SlideshowSfondo({
					timeOut: durataSingoloSfondo
				});
			}
		}
	);
	$(document).ready(
		function() {
			if (location.hostname == 'localhost')
			{
				$(".CLSvisualizzatorestatistiche").remove();
				URLBase = "/Anna/";
			}
		}
	);
	$("body").on("click","#IDhome", function() {
		location.assign(URLBase);
	});
	$("body").on("click","#IDpulsante1", function() {
		visualizzaSezione("CLScurriculum");
	});
	$("body").on("click","#IDpulsante2", function() {
		visualizzaSezione("CLSrepertorio");
	});
	$("body").on("click","#IDpulsante3", function() {
		visualizzaSezione("CLSrecensioni");
	});
	$("body").on("click","#IDpulsante4", function() {
		visualizzaSezione("CLScrescendo");
	});
	$("body").on("click","#IDpulsante5", function() {
		visualizzaSezione("CLScontatti");
	});
	$("body").on("mouseenter",".CLSpulsantemenu", function() {
		$(this).addClass("CLSmenumouseenter", 300);
	});
	$("body").on("mouseleave",".CLSpulsantemenu", function() {
		$(".CLSmenumouseenter").removeClass("CLSmenumouseenter", 300);
	});
	$("body").on("mouseenter",".CLSlinkpulsantemenurep", function() {
		$(this).addClass("CLSmenumouseenter", 300);
	});
	$("body").on("mouseleave",".CLSlinkpulsantemenurep", function() {
		$(this).removeClass("CLSmenumouseenter", 600);
	});
	$("body").on("mouseenter",".CLSpowered", function() {
		var testo = "powered by<br /><a target=\"_blank\" href=\"mailto:marco.cazzaro.0@gmail.com\">Marco Cazzaro</a>";
		$(".CLSpoweredtesto").hide().html(testo).show(300);
		$(this).toggleClass("CLSpoweredgrande", 300);
	});
	$("body").on("mouseleave",".CLSpowered", function() {
		var testo = "?";
		$(".CLSpoweredtesto").hide(100).show(300).text(testo);
		$(this).toggleClass("CLSpoweredgrande", 300);
	});
	$("body").on("mouseenter",".CLSarticolorep", function() {
		$(this).children(".CLSsfondoarticolorep").addClass("CLSsfondoarticolorepevidenziato", 300);
	});
	$("body").on("mouseleave",".CLSarticolorep", function() {
		$(this).children(".CLSsfondoarticolorep").removeClass("CLSsfondoarticolorepevidenziato", 900);
	});
	$(window).scroll( function() {
		var proporzioni = $(window).scrollTop();
		proporzioni = - proporzioni * 0.1;
		$(".CLScontenitoresfondi").stop();
		$(".CLScontenitoresfondi").animate({ "margin-top": proporzioni + "px"}, {duration: 300, easing: "easeOutExpo"});
		var posizioneCorpo = $(window).height() - $(".CLSsfondotestata").height() - 250;
		if ($(window).scrollTop() > posizioneCorpo)
		{
			if ($(".CLSsfondotestatavisibile").length === 0) {
				$(".CLSsfondotestata").addClass("CLSsfondotestatavisibile", 100);
				$(".CLSsfondotestata").show("fade", 500);
			}			
		}
		else
		{
			if ($(".CLSsfondotestatavisibile").length > 0) {
				$(".CLSsfondotestata").removeClass("CLSsfondotestatavisibile", 300);
				$(".CLSsfondotestata").hide("fade", 1000);
			}
		}
		if ($(".CLSrepertorio").is(":visible"))
		{
			$offset_menu_repertorio = $(".CLSnavigazionerepertorio").offset().top - $(window).scrollTop();
			if ($offset_menu_repertorio < $(".CLStestata").height())
			{
				if ($(".CLSnavigazionerepertoriofissa").length === 0)
				{
					$html_menu_rep = $(".CLSnavigazionerepertorio").html();
					$html_menu_rep = $html_menu_rep.replace("CLSmenumouseleave", "");
					$html_menu_rep = $html_menu_rep.replace("CLSlinkpulsantemenurep1", "CLSlinkpulsantemenurep1 CLSlinkpulsantemenurepbianco1");
					$html_menu_rep = $html_menu_rep.replace("CLSlinkpulsantemenurep2", "CLSlinkpulsantemenurep2 CLSlinkpulsantemenurepbianco2");
					$html_menu_rep = $html_menu_rep.replace("CLSlinkpulsantemenurep3", "CLSlinkpulsantemenurep3 CLSlinkpulsantemenurepbianco3");
					var divmenurep;
					divmenurep = $('<div class=\"CLSnavigazionerepertorio CLSnavigazionerepertoriofissa\"></div>').css('display', 'none');
					$("body").append(divmenurep);
					divmenurep.html($html_menu_rep);
					$(".CLSnavigazionerepertoriofissa").show("fade", 300);
				}
			}
			else
			{
				if ($(".CLSnavigazionerepertoriofissa").length > 0)
				{
					$(".CLSnavigazionerepertoriofissa").hide("fade", {duration: 100, complete: function(){
						$(".CLSnavigazionerepertoriofissa").remove();
					} });
				}
			}		
		}
	});
	$("body").on("click",".CLSlinkpulsantemenurep1", function() {
		visualizzaSezioneRepertorio("IDsezioneduoacoleoquattromani");
	});
	$("body").on("click",".CLSlinkpulsantemenurep2", function() {
		visualizzaSezioneRepertorio("IDsezioneduoacoleoduepianoforti");
	});
	$("body").on("click",".CLSlinkpulsantemenurep3", function() {
		visualizzaSezioneRepertorio("IDsezionevioloncellopianoforte");
	});
});

(function($){

    $.fn.SlideshowSfondo = function(vars) {

        var element     = this;
        var timeOut     = (vars.timeOut !== undefined) ? vars.timeOut : 1000;
		  var strIDSfondoAttivo = "";

        var eseguiSlideshow = function() {
			if (strIDSfondoAttivo === "") {
				transizioneSfondo();
			}
			oggettoTimer = setInterval(function(){transizioneSfondo();},timeOut);
        };

        var transizioneSfondo = function() {
			var strTitoloOpera = "";
			var strDirezioneTitolo = "down";

			$(strIDSfondoAttivo).hide("fade", durataFade);
			switch (strIDSfondoAttivo) {
				case "":
					strIDSfondoAttivo = "#IDsfondo1";
					strTitoloOpera = "Anna Acoleo";
					break;
				case "#IDsfondo1":
					strIDSfondoAttivo = "#IDsfondo2";
					strTitoloOpera = "Anna Acoleo";
					break;
				case "#IDsfondo2":
					strIDSfondoAttivo = "#IDsfondo3";
					strTitoloOpera = "Anna e Paola Acoleo";
					break;
				case "#IDsfondo3":
					strIDSfondoAttivo = "#IDsfondo4";
					strTitoloOpera = "Anna Acoleo ed Anna Campagnaro";
					break;
				case "#IDsfondo4":
					strIDSfondoAttivo = "#IDsfondo5";
					strTitoloOpera = "Anna Acoleo";
					break;
				case "#IDsfondo5":
					strIDSfondoAttivo = "#IDsfondo2";
					strTitoloOpera = "Anna Acoleo";
					break;
			}
			if (strIDSfondoAttivo == "#IDsfondo1")
			{
				strIDSfondoAttivo = "#IDsfondo2";
				$(strIDSfondoAttivo).delay(ritardoIniziale).show("fade", durataFade);
			}
			else
			{
				$(strIDSfondoAttivo).show("fade", durataFade);
				$(".CLSsegnapostosfondiattivo").removeClass("CLSsegnapostosfondiattivo", {duration: 300, complete: function(){$("#IDsp" + strIDSfondoAttivo.substr(9)).addClass("CLSsegnapostosfondiattivo", 300);}});
			}
			$(".CLStitolooperasfondo").hide("fade", {duration: 300, direction:strDirezioneTitolo, complete: function(){$(".CLStitolooperasfondo").text(strTitoloOpera);}});
			$(".CLStitolooperasfondo").show("fade", {duration: 1000, direction:strDirezioneTitolo});
        };
        eseguiSlideshow();
    };

})(jQuery);
