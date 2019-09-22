var browser=new DetectBrowser();

function isIE4(){
	return this.brIE4;
}
function isW3C(){
	return this.brW3C
}
 function DetectBrowser(){
	var brIE4=false;
	var brMoz=false;
	var brNs6=false;
	var brOp7=false;
	var brW3C=false;

	var brAgent=navigator.userAgent.toLowerCase();

	var indeks;
	if ((indeks=brAgent.indexOf('msie'))!=-1){
			this.brIE4="true";
	}
	else if (brAgent.indexOf("mozilla") !=-1 ){
		this.brMoz=true;
		this.brW3C=true;
	}
	this.isIE4=isIE4;
	this.isW3C=isW3C;

 }

