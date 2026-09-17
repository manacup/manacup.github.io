function desaImatgeConf(e) {
  e.disabled = true;
  document.getElementById("spnbtn").classList.remove("d-none");

  var file = document.getElementById("ImatgeamagatConf").value;
  var nom = jugadorDesat.Nom;
  var payload = {
      envia: "imatge",
      nom: nom,
      file: file,
      idfull: idfull,
      idJSON: idJSON,
    }
//console.log(payload)
  fetch(macroURL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    // No esperam resposta: amb mode no-cors sempre arriba buida.
    .catch((error) => console.error("Error enviant la imatge:", error));

  e.disabled = false;
  document.getElementById("spnbtn").classList.add("d-none");

  var modal = document.getElementById("desaimatge");
  bootstrap.Modal.getOrCreateInstance(modal).hide();

}
var carregaImatgeConf = function (event) {
  var reader3 = new FileReader();
  reader3.onload = function () {
    /* var output3 = document.getElementById("resjugImatgeConf");
    output3.src = reader3.result; */
    userImg = reader3.result;
    document.querySelectorAll(".userImg").forEach((ui) => {
      ui.src = reader3.result;
    });
  };
  reader3.readAsDataURL(event.target.files[0]);
};
let imgInputImatgeConf = document.getElementById("imagefileConf");
imgInputImatgeConf.addEventListener("change", function (e) {
  if (e.target.files) {
    let imageFile = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = document.createElement("img");
      img.onload = function (event) {
        // Dynamically create a canvas element
        var canvas = document.createElement("canvas");

        // var canvas = document.getElementById("canvas");
        var MAX_WIDTH = 600;
        var MAX_HEIGHT = 600;
        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        var dataurl = canvas.toDataURL("image/jpeg", 0.75);

        var finalUrl = dataurl.replace(/^data:image\/(png|jpe?g);base64,/, "");
        document.getElementById("ImatgeamagatConf").value = finalUrl;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  }
});
