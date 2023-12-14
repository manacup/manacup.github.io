let urlactual = window.location.href.split("?")[0]
function toggleBotons() {
  var botonsCompartir = document.getElementById('botonscompartir');
  botonsCompartir.classList.toggle('mostrar');
}
function compartirWhatsapp() {
    // URL que vols compartir

    var enllac = encodeURIComponent(urlactual+"?faristol="+nouFaristol.join("-"));

    // Crea l'enllaç d'invocació de WhatsApp
    var urlWhatsapp = 'https://wa.me/?text=He aconseguit trobar '+paraulesUsades.length+' jugades. Ho pots superar? ' + enllac;

    // Obre una nova finestra o pestanya amb l'enllaç de WhatsApp
    window.open(urlWhatsapp, '_blank');
  }

  function compartirTelegram() {
    // URL que vols compartir
    var enllac = encodeURIComponent(urlactual+"?faristol="+nouFaristol.join("-"));

    // Crea l'enllaç d'invocació de Telegram
    var urlTelegram = 'https://t.me/share/url?url=' + enllac;

    // Obre una nova finestra o pestanya amb l'enllaç de Telegram
    window.open(urlTelegram, '_blank');
  }