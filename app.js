const donnes = {
  consoles: [
    {
      ref: "IPhone 14",
      prix: 8000,
      image: "images/img1.png",
    },
    { ref: "HP ThinkPad", prix: 12000, image: "images/img2.png" },
    { ref: "PlayStation 5", prix: 9500, image: "images/img3.png" },
  ],
};

window.addEventListener("load", () => {
  fillConsoles(donnes);
});

let addBtn = document.querySelector("[data-add]");
let device = document.querySelector("[data-device]");
let pht = document.querySelector("[data-pht]");
let pttc = document.querySelector("[data-pttc]");
let quanlity = document.querySelector("[data-quantity]");
let tableprd = document.querySelector("[data-table]");

addBtn.addEventListener("click", () => {
  let newItem = validateInputs();
  if (!newItem.valid) {
    return;
  }
  let ref = newItem.device;
  let img = donnes.consoles.filter((dev) => {
    if (dev.ref == ref) {
      return 1;
    }
  });
  let qte = newItem.quanlity;
  let url = img[0].image;
  addDeviceTocart(ref, qte, url);
  pht.value = prixHT();
  pttc.value = prixTTC();
});

function validateInputs() {
  let deviceValue = device.value;
  let quanlityVlaue = quanlity.value;
  if (!deviceValue) {
    return false;
  } else if (quanlityVlaue > 20 && quanlityVlaue < 1) {
    return false;
  } else {
    return { valid: true, device: deviceValue, quanlity: quanlityVlaue };
  }
}

function fillConsoles(obj) {
  device.innerHTML = "";
  obj["consoles"].forEach((art) => {
    let opt = document.createElement("option");
    opt.value = art.ref;
    opt.textContent = art.ref;
    device.appendChild(opt);
  });
}

function addDeviceTocart(ref, qte, url) {
  let rows = tableprd.querySelectorAll("tr");
  let isExist = false;
  rows.forEach((r) => {
    if (ref == r.getAttribute("data-ref")) {
      isExist = true;
      return;
    }
  });
  if (isExist) {
    rows.forEach((r) => {
      if (ref == r.getAttribute("data-ref")) {
        let tds = r.querySelectorAll("td");
        let tdQte = tds[1];
        tdQte.textContent = parseInt(tdQte.textContent) + parseInt(qte);
        r.setAttribute("data-qte", tdQte.textContent);
      }
    });
  } else {
    let row = document.createElement("tr");
    row.setAttribute("data-ref", ref);
    row.setAttribute("data-qte", qte);
    let refdata = document.createElement("td");
    refdata.textContent = ref;
    let qtedata = document.createElement("td");
    qtedata.textContent = qte;
    let imgdata = document.createElement("td");
    let img = document.createElement("img");
    img.src = url;
    imgdata.appendChild(img);
    let actiondata = document.createElement("td");
    let btnaction = "<button class='delete'>Delete</button>";
    actiondata.innerHTML = btnaction;
    row.append(refdata, qtedata, imgdata, actiondata);
    tableprd.appendChild(row);
    row.addEventListener("click", (e) => {
      let target = e.target;
      if (target.classList.contains("delete")) {
        tableprd.removeChild(row);
        pht.value = prixHT();
        pttc.value = prixTTC();
      }
    });
  }
}
function prixHT() {
  let rows = tableprd.querySelectorAll("tr");
  let prixHt = 0;
  rows.forEach((row) => {
    let ref = row.getAttribute("data-ref");
    let qte = row.getAttribute("data-qte");
    donnes["consoles"].forEach((dev) => {
      if (dev.ref == ref) {
        prixHt += qte * dev.prix;
      }
    });
  });
  prixHt = prixHt - prixHt * 0.1;
  return prixHt;
}
function prixTTC() {
  return prixHT() * 1.2;
}
