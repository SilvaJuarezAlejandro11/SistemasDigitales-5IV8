function subneteo(ipv, nsubr) {
  var theTable = document.createElement("table");
  theTable.setAttribute("id", "table");
  var tr2, th, th2, th3;
  tr2 = document.createElement("tr");
  th = document.createElement("th");
  th2 = document.createElement("th");
  th3 = document.createElement("th");
  th.appendChild(document.createTextNode("No. de subred"));
  th2.appendChild(document.createTextNode("Desde"));
  th3.appendChild(document.createTextNode("Hasta"));
  tr2.appendChild(th);
  tr2.appendChild(th2);
  tr2.appendChild(th3);
  theTable.appendChild(tr2);
  document.getElementById("divtable").appendChild(theTable);
  eliminarT();
  var dir_ip = ipv;
  var subr = nsubr;
  var oct1 = parseInt(dir_ip[0]);
  var clase = "";
  var mascara = "";
  var masc_bin = "";
  var mb = [];
  if (oct1 <= 127) {
    clase = "Clase A";
    mascara = "255.0.0.0";
    masc_bin = "11111111.00000000.00000000.00000000";
    mb[0] = "11111111";
    mb[1] = "00000000";
    mb[2] = "00000000";
    mb[3] = "00000000";
    dir_ip[1] = "0";
    dir_ip[2] = "0";
    dir_ip[3] = "0";
  } else if (oct1 >= 128 && oct1 <= 191) {
    clase = "Clase B";
    mascara = "255.255.0.0";
    masc_bin = "11111111.11111111.00000000.00000000";
    dir_ip[2] = "0";
    dir_ip[3] = "0";
  } else if (oct1 >= 192 && oct1 <= 223) {
    clase = "Clase C";
    mascara = "255.255.255.0";
    masc_bin = "11111111.11111111.11111111.00000000";
    dir_ip[3] = "0";
  } else {
    alert("¡Está web solo hace subneteo de clases A, B o C!");
  }
  const ip_bin = [];
  dir_ip.forEach((el) => {
    let num_bin = abinario(el);
    ip_bin.push(num_bin);
  });

  let rob;
  const bitr = (nsub) => {
    for (i = 1; i < 8; i++) {
      let res = Math.pow(2, i) - nsub;
      console.log(res);
      if (res >= 0) {
        rob = i;
        console.log(rob);
        return rob;
      }
    }
  };
  let n = bitr(subr);
  var salto = 0;
  var binario = 128;
  if (n == 1) {
    salto = binario;
  } else {
    for (i = 1; i < n; i++) {
      binario = binario / 2;
      salto = binario;
    }
  }
  var npow = Math.pow(2, n);
  let pos = 0;
  if (clase == "Clase A") {
    //Calculate num host
    var bit_libres = 24 - n;
    var host = Math.pow(2, bit_libres) - 2;
    //Create a new mask
    var ceros = 8 - n;
    var cero = "0";
    var uno = "1";
    mb[1] = uno.repeat(n) + cero.repeat(ceros);
    for (i = 0; i < npow; i++) {
      var desde = [];
      var hasta = [];
      console.log("No. de subred: " + (i + 1));
      let pre = Number(dir_ip[1]);
      pos = pos + pre + salto;
      console.log("La direccion de res es:" + dir_ip);

      dir_ip.forEach((e) => {
        //Where
        desde.push(e);
        desde[1] = pos - salto;
        desde[2] = dir_ip[2];
        desde[3] = dir_ip[3];
        //Until
        hasta.push(e);
        hasta[1] = pos - 1;
        hasta[2] = "255";
        hasta[3] = "255";
      });
      desde.pop();
      desde.pop();
      desde.pop();
      console.log("Desde la ip: " + desde);
      hasta.pop();
      hasta.pop();
      hasta.pop();
      console.log("Hasta la ip: " + hasta);

      //Create the data from the table

      var tr, td, td2, td3;
      tr = document.createElement("tr");
      td3 = document.createElement("td");
      td = document.createElement("td");
      td2 = document.createElement("td");
      td3.appendChild(document.createTextNode(i + 1));
      td.appendChild(document.createTextNode(desde));
      td2.appendChild(document.createTextNode(hasta));
      tr.appendChild(td3);
      tr.appendChild(td);
      tr.appendChild(td2);
      theTable.appendChild(tr);
      document.getElementById("divtable").appendChild(theTable);
    }
  } else if (clase == "Clase B") {
    var bit_libres = 16 - n;
    var host = Math.pow(2, bit_libres) - 2;
    for (i = 0; i < npow; i++) {
      let desde = [];
      let hasta = [];
      console.log("No. de subred: " + (i + 1));
      let pre = Number(dir_ip[2]);
      pos = pos + pre + salto;
      console.log("La direccion de res es:" + dir_ip);

      dir_ip.forEach((e) => {
        desde.push(e);
        desde[1] = dir_ip[1];
        desde[2] = pos - salto;
        desde[3] = dir_ip[3];
        hasta.push(e);
        hasta[1] = dir_ip[1];
        hasta[2] = pos - 1;
        hasta[3] = "255";
      });
      desde.pop();
      desde.pop();
      desde.pop();
      console.log("Desde la ip: " + desde);
      hasta.pop();
      hasta.pop();
      hasta.pop();
      console.log("Hasta la ip: " + hasta);

      var tr, td, td2, td3;
      tr = document.createElement("tr");
      td3 = document.createElement("td");
      td = document.createElement("td");
      td2 = document.createElement("td");
      td3.appendChild(document.createTextNode(i + 1));
      td.appendChild(document.createTextNode(desde));
      td2.appendChild(document.createTextNode(hasta));
      tr.appendChild(td3);
      tr.appendChild(td);
      tr.appendChild(td2);
      theTable.appendChild(tr);
      document.getElementById("divtable").appendChild(theTable);
    }
  } else if (clase == "Clase C") {
    var bit_libres = 8 - n;
    var host = Math.pow(2, bit_libres) - 2;
    for (i = 0; i < npow; i++) {
      let desde = [];
      let hasta = [];
      console.log("No. de subred: " + (i + 1));
      let pre = Number(dir_ip[3]);
      pos = pos + pre + salto;
      console.log("La direccion de res es:" + dir_ip);

      dir_ip.forEach((e) => {
        desde.push(e);
        desde[1] = dir_ip[1];
        desde[2] = dir_ip[2];
        desde[3] = pos - salto;
        hasta.push(e);
        hasta[1] = dir_ip[1];
        hasta[2] = dir_ip[2];
        hasta[3] = pos - 1;
      });
      desde.pop();
      desde.pop();
      desde.pop();
      console.log("Desde la ip: " + desde);
      hasta.pop();
      hasta.pop();
      hasta.pop();
      console.log("Hasta la ip: " + hasta);

      var tr, td, td2, td3;
      tr = document.createElement("tr");
      td3 = document.createElement("td");
      td = document.createElement("td");
      td2 = document.createElement("td");
      td3.appendChild(document.createTextNode(i + 1));
      td.appendChild(document.createTextNode(desde));
      td2.appendChild(document.createTextNode(hasta));
      tr.appendChild(td3);
      tr.appendChild(td);
      tr.appendChild(td2);
      theTable.appendChild(tr);
      document.getElementById("divtable").appendChild(theTable);
    }
  }

  document.getElementById("resultado").innerHTML =
    "IP en binario: " +
    ip_bin +
    "<br>Mascara de red: " +
    mascara +
    "<br>Mascara en binario: " +
    masc_bin +
    "<br>Nueva Mascara en binario: " +
    mb +
    "<br>Tipo de clase: " +
    clase +
    "<br>No. de saltos: " +
    salto +
    "<br>Bits robados: " +
    n +
    "<br>Numero de host: " +
    host;
}

function eliminarT() {
  let tabla = document.getElementById("table");
  if (!tabla) {
  } else {
    let padre = tabla.parentNode;
    padre.removeChild(tabla);
  }
}
function abinario(num) {
  const binario = [];
  while (num > 1) {
    binario.push(num % 2);
    num = Math.floor(num / 2);
  }
  binario.push(num);
  return String(binario.reverse().join(""));
}

function validarip() {
  let ipv = document.getElementById("dip").value.split(".");
  let subr = parseInt(document.getElementById("nsub").value);
  console.log(ipv.length);
  if (ipv.length != 4) {
    alert("IP no valida. Ingrese de nuevo");
    return false;
  } else ipv[0] = parseInt(ipv[0]);
  ipv[1] = parseInt(ipv[1]);
  ipv[2] = parseInt(ipv[2]);
  ipv[3] = parseInt(ipv[3]);
  if (ipv[0] > 255 || ipv[1] > 255 || ipv[2] > 255 || ipv[3] > 255) {
    alert("IP no valida. Ingrese de nuevo");
    return false;
  } else
    for (let i = 0; i < ipv.length; i++) {
      var nan = isNaN(ipv[i]);
      if (nan == true) {
        alert("IP no valido.");
        return false;
      }
    }
  if (subr > 128) {
    alert("Maximo de subredes son 128.");
    return false;
  } else if (ipv[0] >= 192) {
    if (subr >= 65) {
      alert("La clase C tienen un maximo de 64 subredes.");
      return false;
    }
  } else if (isNaN(subr) == true) {
    alert("Numero de subredes vacio. No se podra calcular");
    return false;
  } else {
    ipv[0] = ipv[0].toString();
    ipv[1] = ipv[1].toString();
    ipv[2] = ipv[2].toString();
    ipv[3] = ipv[3].toString();
    return subneteo(ipv, subr);
  }
}

function subneteohost() {
  let ipv = document.getElementById("dip").value.split(".");
  var host = parseInt(document.getElementById("nhost").value);
  //Se valida la ip
  if (ipv.length != 4) {
    alert("IP no valida. Ingrese de nuevo.");
    return false;
  } else ipv[0] = parseInt(ipv[0]);
  ipv[1] = parseInt(ipv[1]);
  ipv[2] = parseInt(ipv[2]);
  ipv[3] = parseInt(ipv[3]);
  console.log(ipv);
  if (ipv[0] > 255 || ipv[1] > 255 || ipv[2] > 255 || ipv[3] > 255) {
    alert("IP no valida. Ingrese de nuevo.");
    return false;
  } else
    for (let i = 0; i < ipv.length; i++) {
      var nan = isNaN(ipv[i]);
      if (nan == true) {
        alert("IP no valida. Ingrese de nuevo.");
        return false;
      }
    }
  if (host > 8388606) {
    //Validamos el host
    alert("Numero de host maximo 8,388,606");
    return false;
  } else if (isNaN(host) == true) {
    alert("Numero de host vacio. No se podra calcular.");
    return false;
  }
  var oct1 = ipv[0];
  var bitr = 0;
  if (oct1 <= 127) {
    for (let i = 7; i > 0; i--) {
      var hostm = Math.pow(2, 24 - i) - 2;
      if (host <= hostm) {
        bitr = i;
        break;
      }
    }
  } else if (oct1 >= 128 && oct1 <= 191) {
    for (let i = 7; i > 0; i--) {
      var hostm = Math.pow(2, 16 - i) - 2;
      if (host <= hostm) {
        bitr = i;
        break;
      }
    }
  } else if (oct1 >= 192 && oct1 <= 223) {
    for (let i = 6; i > 0; i--) {
      var hostm = Math.pow(2, 8 - i) - 2;
      if (host <= hostm) {
        bitr = i;
        break;
      }
    }
  }
  var subr = Math.pow(2, bitr);
  ipv[0] = ipv[0].toString();
  ipv[1] = ipv[1].toString();
  ipv[2] = ipv[2].toString();
  ipv[3] = ipv[3].toString();
  return subneteo(ipv, subr);
}

function convertirbin() {
  eliminarP();
  let ipv = document.getElementById("dip").value.split(".");
  if (ipv.length != 4) {
    alert("IP no valida. Ingrese de nuevo.");
    return false;
  } else ipv[0] = parseInt(ipv[0]);
  ipv[1] = parseInt(ipv[1]);
  ipv[2] = parseInt(ipv[2]);
  ipv[3] = parseInt(ipv[3]);
  if (ipv[0] > 255 || ipv[1] > 255 || ipv[2] > 255 || ipv[3] > 255) {
    alert("IP no valida. Ingrese de nuevo.");
    return false;
  } else
    for (let i = 0; i < ipv.length; i++) {
      var nan = isNaN(ipv[i]);
      if (nan == true) {
        alert("IP no valida. Ingrese de nuevo.");
        return false;
      }
    }
  const ip_bin = [];
  ipv.forEach((el) => {
    let num_bin = abinario(el);
    ip_bin.push(num_bin);
  });
  var theTable2 = document.createElement("table");
  theTable2.setAttribute("id", "p");
  let tr, td;
  tr = document.createElement("tr");
  td = document.createElement("td");
  td.appendChild(document.createTextNode("Convertido a binario: " + ip_bin));
  tr.appendChild(td);
  theTable2.appendChild(tr);
  document.getElementById("texto").appendChild(theTable2);
}
function eliminarP() {
  let tabla = document.getElementById("p");
  if (!tabla) {
  } else {
    let padre = tabla.parentNode;
    padre.removeChild(tabla);
  }
}
