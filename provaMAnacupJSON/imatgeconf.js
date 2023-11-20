function desaImatgeConf(e) {
  e.disabled = true;
  document.getElementById("spnbtn").classList.remove("d-none");

  var file = document.getElementById("ImatgeamagatConf").value;
  var nom = jugadorDesat.Nom;

  fetch(macroURL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      envia: "imatge",
      nom: nom,
      file: file,
      idfull: idfull,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Resposta del servidor:", data);

      console.log(data);
      e.disabled = false;
      document.getElementById("spnbtn").classList.add("d-none");
      var modal = document.getElementById("desaimatge");
      modal.classList.remove("show");
      modal.classList.add("d-none");
      document.querySelector(".modal-backdrop").classList.remove("show");
      document.querySelector(".modal-backdrop").classList.add("d-none");
      /*dades.filter((j) => j.Nom == nom)[0].Imatge = data;
       jugadorDesat.Imatge = data;
      renderUserCard(jugadorDesat); */
    })
    .catch((error) => console.error("Error:", error));

  /*       google.script.run.withSuccessHandler((url) => {
      console.log(url)
      e.disabled = false
      document.getElementById("spnbtn").classList.add("d-none")
      var modal = document.getElementById('desaimatge')
      modal.classList.remove('show');
      modal.classList.add('d-none');
      document.querySelector(".modal-backdrop").classList.remove('show');
      document.querySelector(".modal-backdrop").classList.add('d-none');
      data.filter(j => j.Nom == nom)[0].Imatge = url
      jugadorDesat.Imatge = url
      renderUserCard(jugadorDesat)

    }).uploadFilesImatge(nom, file); */
}
var carregaImatgeConf = function (event) {
  var reader3 = new FileReader();
  reader3.onload = function () {
    /* var output3 = document.getElementById("resjugImatgeConf");
    output3.src = reader3.result; */
    dades.filter((j) => j.Nom == nom)[0].Imatge = reader3.result
    jugadorDesat.Imatge = reader3.result
    document.querySelectorAll(".userImg").forEach(ui=>{
        ui.src = reader3.result
    })
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
        var ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);

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

        var dataurl = canvas.toDataURL("image/png");

        var finalUrl = dataurl.replace(/^data:image\/(png|jpg);base64,/, "");
        document.getElementById("ImatgeamagatConf").value = finalUrl;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  }
});
