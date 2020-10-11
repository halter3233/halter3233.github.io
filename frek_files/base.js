koloryDef = new Array();
koloryDef.push('#000000');
koloryDef.push('#990000');
koloryDef.push('#009900');
koloryDef.push('#000099');
koloryDef.push('#999900');
koloryDef.push('#990099');
koloryDef.push('#009999');
koloryDef.push('#0085ff');
koloryDef.push('#995600');
koloryDef.push('#e07f07');
koloryDef.push('#6f02c1');
koloryDef.push('#009c63');
koloryDef.push('#0d009c');
koloryDef.push('#939c01');
koloryDef.push('#ae02dd');

koloryDef.push('#FF8300');
koloryDef.push('#02A3D9');
koloryDef.push('#E8FD00');
koloryDef.push('#00E700');
koloryDef.push('#4719DA');
koloryDef.push('#FFD300');
koloryDef.push('#FF0000');
koloryDef.push('#0B62A4');
koloryDef.push('#A600A6');
koloryDef.push('#CCF600');
koloryDef.push('#FF9200');
koloryDef.push('#00CC00');
koloryDef.push('#3914AF');
koloryDef.push('#FF7400');

//mkRelation - interfejs do łączenia obiektów z toolkitu 

function makeRelation (parent, child) {
	parent.dom.appendChild(child.dom);
}


//Obiekty

function tkPopup(zawartosc, naglowek) {
//{{{
	//this.id = id;
	//this.prt = prt;
	this.naglowek = naglowek || false;

	var popup = document.createElement('div');
	//popup.setAttribute('id', id);
	popup.className = 'popup1';
	if (this.naglowek == true) {
		var head = document.createElement('div');
		head.className = 'nagl';
		head.style.textAlign = 'right';
		
		//tutaj sprawdz czy IE (poprawic!!)
		if (document.all) {
			
			function IEdrag (e) {
				//x = window.event.clientX
				//y = window.event.clientY
				//popup.setPos(x, y);
				alert(window.event);
				//window.status = ''+x;
			}

			//head.ondragstart = IEdrag ();
			//head.ondrag = IEdrag ();
			//head.ondragend = IEdrag ();

				
		} else {
			head.onmousedown = function (e) {
				popup.dom.onmousemove = function (e) {
					x = e.clientX;
					y = e.clientY;
					popup.setPos(x - 50, y - 5);	
				}
				popup.dom.onmouseup = function (e) {
					popup.dom.onmousemove = null;
				}
				
			
			}
		}
		
		var cButt = document.createElement('a');
		cButt.className = 'butt';
		cButt.onclick = function (e) {
			popup.setVis(0);
		}
		cButt.appendChild(document.createTextNode('x'));
		head.appendChild(cButt);
		popup.appendChild(head);
	}
	var content = document.createElement('div');
	content.appendChild(zawartosc.dom);
	popup.appendChild(content);

	//prt.appendChild(popup);
	//alert(this.prt);	
	this.dom = popup;

	this.x = this.dom.style.left;
	this.y = this.dom.style.top;
	
	this.setPos = function (x, y) {
		var width = this.dom.offsetWidth
		var height = this.dom.offsetHeight
		var bodyWidth = document.body.clientWidth
		var bodyHeight = document.body.clientHeight
		
		//sprawdz czy popup nie wyskoczy poza ekran
		//jesli tak skoryguj pozycje
		
		//alert(top.scrollTop+' '+this.dom.scrollLeft)
		//alert(x+', '+y);
		if (x+width > bodyWidth) {
			x = x-width
		} 
		if (y+height > bodyHeight) {
			y = y-height
		}
		//alert(width+','+height+'\n'+bodyWidth+','+bodyHeight+'\n'+offsetTop+','+offsetLeft)
		this.dom.style.left = ''+x;
		this.dom.style.top = ''+y;
		this.x = ''+x;
		this.y = ''+y;
	}
	
	//this.getPos = function () {
	//	wynik[0] = this.tkdom.style.left;
	//	wynik[1] = this.tkdom.style.top;
	//	return wynik;
	//}
	
	this.setVis = function (vis) {
		if (vis == 1) 
			this.dom.style.visibility='visible';
		else
			this.dom.style.visibility='hidden';
	}

	this.setStyle = function (nazwa, wartosc) {
		this.dom.style[nazwa] = wartosc;
	}

}
//}}}

//tkFormEl - prototyp wszelkich elementów formularza  
//	title - tytuł pola (do wyświetlenia w formularzu)
//	name - odpowiednik parametru name (input, select, textarea);
//	type - odpowiednik parametru type input + 'select' - dla <select>
//		   i 'textarea' dla <textarea>

function tkFormEl (type, name, value, title) {
//{{{

//Parametry
	this.dom = null;
	this.type = type || null;
	this.name = name || 'bez_nazwy';
	this.title = title || 'Bez tytulu';
	this.value = '';
//Metody
	this.setValue = function () { 
		alert ("setValue nie zostało zdefiniowane")
		return false 
	};
	this.getValue = function () { 
		alert ("getValue nie zostało zdefiniowane")
		return false 
	};
}
//}}}

//tkSelect - obiekt odpowiadający <select>
//	name 	- parametr name <select>
//	selTab 	- tablica obiektów opisujących <option> (tablica obiektow z polami id, nazwa) 
//	selId 	- identyfikator wybranego domyslnie elementu

function tkSelect (name, selTab, selId, title) {
//{{{	
	
	var sel = document.createElement('select');
	sel.name = name;
	//sel.setAttribute('id', id);
	//opt = document.createElement('option');
	//opt.setAttribute('value', '0');
	//opt.appendChild(document.createTextNode('-'));
	//sel.appendChild(opt);
	
	for (i in selTab) {
		var opt = document.createElement('option');
		opt.setAttribute('value', selTab[i].id);
		if (selTab[i].id == selId) {
			//alert('selected');
			opt.setAttribute('selected', 'selected');
		}
		var val = document.createTextNode(selTab[i].nazwa);
		opt.appendChild(val);
		sel.appendChild(opt);
	}
	//prt.appendChild(sel);
	
	//Parametry:
	this.dom = sel;
	//this.type = 'select';
	this.name = name;
	this.title = title;
	this.value = this.dom.options[selId];

	//Metody:
	

	this.getSelectedIndex = function () {
		return this.dom.selectedIndex;
	}
	
	this.getSelectedValue = function () {
		return this.dom.value;
	}
	
	this.setSelectedIndex = function (index) {
		this.dom.selectedIndex = ''+index;
	}

	this.setSelectedValue = function (value) {
		this.dom.value = value;
	}
	
	this.setValue = function (wartosc) {
			
		this.value = wartosc;
		for (i = 0; i < this.dom.options.length; i++) {
			if (this.dom.options[i].value == wartosc) {
				this.setSelectedIndex(i);
				return true;
			}
		}
		return false;
	}
	
	this.getValue = function () {
		return this.dom.options[this.dom.selectedIndex].value;
	}


}
tkSelect.prototype = new tkFormEl('select');
//}}}

//tkInput - obiekt reprezentujący <input>
//	type 	- typ pola input
//	name 	- nazwa pola formularza
//	value 	- wartosc wpisana do pola input
//	title 	- tytuł pola do wyświetlenia w formularzu
// 	size 	- dlugosc pola formularza (parametr size <input>)

function tkInput(name, value, type, title, size) {
//{{{

	var inp = document.createElement('input');
	
	//Właściwości
	this.type = type;
	this.name = name;
	this.value = value || '';
	this.dom = inp;
	this.title = title;
	this.size = size || '8';
	
	//Metody
	this.setValue = function (val) {
		this.dom.value = val;
		this.value = val;
	}

	this.getValue = function () {
		return this.dom.value
	}
	
	inp.name = this.name;
	inp.type = this.type;
	inp.value = this.value;
	inp.size = this.size;

}
tkInput.prototype = new tkFormEl('text');
//}}}

//tkRadioButton - obiekt odpowiadający elementowi <input type="radio">

function tkRadioButton(name, value, title, checked) {
//{{{
	this.name = name;
	this.value = value;
	this.title = title;
	this.checked = checked;
	this.type = 'radio';

	this.dom = document.createElement('div');
	
	//obejscie problemu w IE z nieklikalnymi radio buttonami
	try {
		this.domInp = document.createElement('<input type="radio" name="'+ name +'">');
	
	} catch (err) {
		this.domInp = document.createElement('input');
	
	}

	this.domInp.value = value;
	this.domInp.name = name;
	this.domInp.setAttribute('type', this.type);
	//this.domInp.setAttribute('checked', checked ? 'checked' : '');
	this.domInp.checked = checked

	this.dom.appendChild(this.domInp);
	
	this.dom.appendChild(document.createTextNode(' - ' + title));

	
	this.getChecked = function () {
		return this.domInp.checked;	
	}

	this.setChecked = function (checked) {
		this.checked = checked;
		//this.domInp.setAttribute('checked', checked ? 'checked' : '');
		this.domInp.checked = checked;
	}

	this.getValue = function () {
		return this.domInp.value;
	}


}
tkRadioButton.prototype = new tkInput('', '', 'radio');
//}}}

//tkRadioGroup - obiekt odpowiadający grupie przyciskow radio

function tkRadioGroup(name, radios, title) {
//{{{
	this.name = name;
	this.title = title;
	this.radios = [];
	this.dom = document.createElement('div');

	for (var i in radios) {
		
		if (radios[i].type == 'radio') {
			this.radios.push(radios[i]);
			this.dom.appendChild(radios[i].dom);
		}
	}
	
	this.setValue = function (value) {
		for (var i in this.radios) {
			if (this.radios[i].getValue() == value) {
				this.radios[i].setChecked(true);
			} else {
				this.radios[i].setChecked(false);
			}
		}
	}

	this.getValue = function () {
		
		for (var i in this.radios) {
			if (this.radios[i].getChecked()) {
				return this.radios[i].value;
			}
		}
	
	}

	this.getElements = function () {
		return this.elements;
	}
	

}
tkRadioGroup.prototype = new tkFormEl('radioGroup');

//}}}

//tkButton - obiekt reprezentujący <button>

function tkButton(name, value, type, contents) {
//{{{
	var button = document.createElement('button');
	button.name = name;
	button.value = value;
	if (type) {
		button.setAttribute('type', type);
	}
	//if (!contents) {
	//	contents = document.createTextNode('button');
	//}
	if (contents) {
		button.appendChild(contents);
	}
	//Parametry
	this.name = name;
	this.value = value;
	this.type = 'bt_'+type || 'bt_button';
	this.dom = button;
	
	//Metody

	this.setValue = function (value) {
		this.dom.value = value;
		this.value = value;
	}
	
	this.getValue = function () {
		return this.dom.value;
	}

}
tkButton.prototype = new tkFormEl('button');
//}}}

var liczForm = 0;

//tkForm - obiekt reprezentujący formularz
//	content - zawartosc formularza - tablica obiektów formEl
//	action - gdzie ma być wysłany formularz
//	method - sposób wysłania formularza "GET" lub "POST"
//	buttons - przyciski do dołączenia na koncu formularza (domyślnie submit i cancel);

function tkForm(action, method, content, buttons) {
//{{{	
	liczForm++;
	//alert('inicjalizacja tkForm !');
	var form = document.createElement('form');
	form.action = action;
	form.method = method;

	var tbl = document.createElement('table');
	//tbl.border = '1';
	
	var tblbody = document.createElement('tbody');
	
	//Rzad z przyciskami
	var row = document.createElement('tr');
	var cell = document.createElement('td');
	cell.colSpan = "2";
	cell.align = "center";
	
	if (!buttons) {
	
		var buttons = new Array ();
		buttons[0] = new tkInput ('sbm', 'submit', 'wyślij');
		buttons[1] = new tkInput ('rst', 'reset', 'kasuj');	
	}
	
	for (i = 0; i < buttons.length; i++) {
		cell.appendChild(buttons[i].dom);
	}
	row.appendChild(cell);
	tblbody.appendChild(row);

	tbl.appendChild(tblbody);
	form.appendChild(tbl);
	
	//Parametry

	this.id = 'form'+liczForm;
	this.dom = form;
	this.action = action;
	this.method = method;
	this.content = content;
	this.buttons = buttons;
	
	
	//Metody

	this.addField = function (pole) {
		
		if (pole.type != 'hidden') {
			var row = document.createElement('tr');
			row.id = this.id+'_'+pole.name;
			var cell = document.createElement('td');
			cell.appendChild(document.createTextNode(pole.title));
			row.appendChild(cell);
			var cell = document.createElement('td');
			cell.appendChild(pole.dom);
			row.appendChild(cell);
			tbody = this.dom.getElementsByTagName('tbody').item(0)
			tbody.insertBefore(row, tbody.lastChild)
		} else {
			pole.dom.id = this.id+'_'+pole.name;
			this.dom.insertBefore(pole.dom, this.dom.firstChild);
		}
		//docaj pole do tablicy opisujacej
		//this.content.push(pole);
	}
	


	this.delField = function (nazwaPola) {
			//usun pole z tablicy opisujacej
			for (i = 0; i < this.content.length; i++) {
				if (this.content[i].name = nazwaPola) {
					this.content.splice(i, 1);
				}
			}
			
			//sprawdz czy to nie hidden
			var inp = this.dom.getElementsByTagName('input');
			for (i = 0; i < inp.length; i++) {
				if (inp[i].id == nazwaPola) {
					this.dom.removeChild(inp[i]);
					return true
				}
			}
			//jesli nie hidden to widoczne (w <tr></tr>)
			var teery = this.dom.getElementsByTagName('tr');
			for (i = 0; i < teery.length; i++) {
				if (teery[i].id == this.id+'_'+nazwaPola) {
					var prt = teery[i].parentNode;
					prt.removeChild(teery[i]);
					return true
				}
			}
			//w przeciwnym wypadku 
			return false;

	}
	
	this.getFieldRef = function (nazwa) {
		for (i = 0; i < this.dom.elements.length; i++) {
			if (this.dom.elements[i].name == nazwa) { 
				return this.dom.elements[i];
			}
		}
		return false;
	}
	
	this.setFieldValue = function(nazwa, wartosc) {
		//alert (this.dom.elements[0].name);
		for (i = 0; i < this.content.length; i++) {
			if (this.content[i].name == nazwa) {
				
				var wartosc = wartosc == undefined ? '' : wartosc; 
				this.content[i].setValue(wartosc);
				return true;
			}
		}
		
		//for (i = 0; i < this.dom.elements.length; i++) {
		//	if (this.dom.elements[i].name == nazwa) {
		//		this.dom.elements[i].value = wartosc == undefined ? '' : wartosc;
		//		return true;
		//	}
		//}
		return false;
	}

	this.getFieldValue = function (nazwa) {
		
		/*
		for (i = 0; i < this.content.length; i++) {
			if (this.dom.elements[i].name == nazwa) {
				return this.dom.elements[i].value;
			}
		}
		*/

		for (var i = 0; i < this.content.length; i++) {
			if (this.content[i].name == nazwa) {
				return this.content[i].getValue();
			}
		}
		return false
	}

	//Dodaj pola do firmularza
	if (content)
		for (i = 0; i < content.length; i++) this.addField(content[i]);
		

}
//}}}

// Znajduje absolutna pozycje wybranego obiektu na stronie

function findPos(obj) {
//{{{
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}
//}}}

function licznik (godz, min, sek) {
//{{{	
	this.godz = godz;
	this.min = min;
	this.sek = sek;
	

	this.zmien = function(o) {
	//	document.writeln(this.sek);
		alert(o);
		o.sek -= 1;
		if (o.sek < 0) {
			o.sek = 59;
			o.min -= 1;
		}
		if (o.min < 0) {
			o.min = 59
			o.godz -= 1;
		}
		
		var min = o.min < 10 ? '0'+o.min : o.min;
		var godz = o.godz < 10 ? '0'+o.godz : o.godz;
		var sek = o.sek < 10 ? '0'+o.sek : o.sek;

		window.status = godz+":"+min+":"+sek;

		if ((o.godz == 0) && (o.min == 0) && (o.sek == 0)) {
			o.stop();
			alert('czas minął...');
		}
		//window.status = o;
	}
	
	this.stop = function () {
		clearInterval(this.intv);
	}
	//alert(this);
	//this.start = function () {
		this.intv = setInterval(this.zmien, 1000, this);
	//}


}
//}}}

//Brzydsza wersja licznika ;-P


var statusSesjiEl = $('<div id="status-sesji"/>');
$(document).ready(function() {
    $("body").append(statusSesjiEl);
    statusSesjiEl.css('display', 'none');
});

function licznik_kasuj () {
    licz_godz = 0;
    licz_min = 24;
    licz_sek = 0;

}

licznik_kasuj();


//Reset licznika po kliknięciu
$(document).on('click', function(event) {
    //Dodać wywolanie co kilka kliknięć po stronie serwera czegoś co odnowi sesje (still alive)
	licznik_kasuj();
	//znajdz bazowy url
	var pinguj = Math.round(Math.random() * (5 - 1) + 1) === 4;
	
	if (pinguj) {
		var burl_re = /^(http.+administrator\/|wychowawca\/).*$/;
		var trafy = burl_re.exec(window.location.href);
		if (trafy !== null) {
			var baz_url = trafy[1];
			//wywolaj ping
			console.log('ping');
			$.get(baz_url + '?dz=ping');
		}


	}
});

function licznik_zmien () {
    statusSesjiEl.css('display', 'block');
	licz_sek -= 1;
	if (licz_sek < 0) {
		licz_sek = 59;
		licz_min -= 1;
	}
	if (licz_min < 0) {
		licz_min = 59
		licz_godz -= 1;
	}
	
	var min = licz_min < 10 ? '0'+licz_min : licz_min;
	var godz = licz_godz < 10 ? '0'+licz_godz : licz_godz;
	var sek = licz_sek < 10 ? '0'+licz_sek : licz_sek;

    var czasTekst = godz+":"+min+":"+sek;
    if (licz_godz === 0 && licz_min < 5) {
        czasTekst = '<span class="sesja-malo-czasu">' + czasTekst + '</span>';
    }
	statusSesjiEl.html('Do zakończenia sesji zostało: '+czasTekst);

	if ((licz_godz == 0) && (licz_min == 0) && (licz_sek == 0)) {
		clearInterval(licznik_intv);
		//przekieruj do logout
		//alert('czas minął...');
		var prt = ''
                if (location.port) {
                        prt = ':'+location.port
                }       
                document.location.href = location.protocol+'//'+location.host+prt+location.pathname+"?dz=logout"	
	}
}

//inicjalizacja
var wprowadzonoZmiany = false;

//Funkcja sprawdzajaca czy wprowadzono zmiany (na podstawie zmiennej wprowadzonoZmiany)
//jezeli wprowadzonoZmiany == true pyta czy napewno opuscic dzial
//argument:
//	gdziePrzekierowac - adres gdzie skierowac po potwierdzeniu
function sprawdzZmiany (gdziePrzekierowac) {
        
        if (wprowadzonoZmiany) { 
	if (confirm('Wprowadzone zmiany nie zostały zapisane, mimo to opuscić ten dział ?')) 
			location.href = gdziePrzekierowac
	} else {
		location.href = gdziePrzekierowac
	}
}


naPewnoKomunikat = ''
//Funkcja - pytajaca uzytkownika czy jest pewien co robi
//(do wykorzystania w <a href="javascript:">)
//moze miec 2 argumenty:
//	gdziePrzekierowac - url do miejsca gdzie przekierowac uzytkownika po potwierdzeniu
//	naPewnoKomunikat (opcjonalnie) - komunikat jaki ma sie pojawic

function naPewno (gdziePrzekierowac) {
        if (naPewno.arguments.length == 2) {
            var komunikat = naPewno.arguments[1]
        } else {
            var komunikat = naPewnoKomunikat;
        }
        
        if (confirm(komunikat)) 
            location.href = gdziePrzekierowac
}

//Funkcja blokujaca podwojne klikniecia w przycisk submit

function blokPodwojSubm() {
	var inps = document.getElementsByTagName("input")
	var ile = inps.length 
	var type
	
	var ilosc_subm = 0
	var ilosc_input = 0
	for (var i = 0; i < ile; i++) {
		ilosc_input++
		type = inps[i].getAttribute("type")
		if (type != null && type.toLowerCase() == "submit") {
			ilosc_subm++
			inps[i].onclick = function (e) {
				
				if (this.form.onsubmit) {
					if (!this.form.onsubmit()) {
                        return false;
                    } 
				}
				//Dodaj do formularz klikniete pole jako hidden aby wyslac jego wartosc na serwer
				var hid_inp = document.createElement("input")
				hid_inp.setAttribute("type", "hidden")
				hid_inp.name = this.name
				hid_inp.value = this.value
				this.parentNode.appendChild(hid_inp)
				this.disabled = true
				this.form.submit()
			}
		}
	}
	//alert("INPUT: " + ilosc_input + " SUBMIT: " + ilosc_subm)
	//return true
}




//Funkcja inicjalizujaca (dla unikniecia błedów na onload)
// nadpisywana później przez inity() w poszczególnych działach
function init() {
	blokPodwojSubm();
}

//funkcja wywolywana na zdarzenie unload w <body>
function onunload_handler() {

}

//Funkcja zamienia kodowanie RGB na HEX (wykorzystywanie w obszarach oceniania)
function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function eDziennikLocationParser(location) {
    var out = {};
    var pathRE = /^.+\/$/;
    out.sciezka = location.pathname;
    //sciezka bez nazwy skryptu 
    if (!pathRE.test(out.sciezka)) {
        out.sciezka = out.sciezka.replace(/^(.+\/)[^\/]+$/, '$1'); 
    }
   
    var dzialRE = /^.*[?&]dz=([^&]+).*$/;
    if (dzialRE.test(location.search)) {
        out.dzial = location.search.replace(dzialRE, '$1'); 
    }
    var funkcjaRE = /^.*[?&]fn=([^&]+).*$/;
    if (funkcjaRE.test(location.search)) {
        out.funkcja = location.search.replace(funkcjaRE, '$1');
    }
    return out;
}

function eDziennikGetCookie(nazwa) {
    var wartosc = "; " + document.cookie;
    var czesci = wartosc.split("; " + nazwa + "=");
    if (czesci.length == 2) return czesci.pop().split(";").shift();
}





function changeLayout(){
    var currentPath = window.location.pathname;
    currentPath = currentPath.replace('/ppe/PPE.Edziennik','');
    currentPath = currentPath[0] == '/' ? currentPath.substr(1) : currentPath;
    var paramsQuery = window.location.search;
    if(currentPath.search("prymus-")===-1){
        //przenies do prymusa
        window.location.href = "../prymus-"+currentPath+paramsQuery;
    }else{
        //przenies do zwyklego
        var oldLayoutPath = currentPath.replace("prymus-","");
        window.location.href = "../"+oldLayoutPath+paramsQuery;
    }
}