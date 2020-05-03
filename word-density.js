var in_obj = document.getElementById('input');
var out_obj = document.getElementById('output');
var download_obj = document.getElementById('download');

in_obj.addEventListener('input', function(e) {
	var input = in_obj.value.replace(/[^\w\s-]/gi, '').toLowerCase();
	var input = input.split(/\s+/);
	var words = [];
	out_obj.value = '';
	
	input.forEach(function(w) {
		var wk = -1;
		for(var i = 0; i < words.length; i++) {
			if(words[i][0] === w) {
				wk = i;
			}
		}
		
		if(wk >= 0) {
			words[wk][1]++;
		} else if(w.length > 0) {
			words.push([w,1]);
		}
	});
	
	words.sort(function(a,b) {
		if(b[1] == a[1]) {
			return a[0].localeCompare(b[0]);
		} else {
			return b[1] - a[1];
		}
	});
	
	words.forEach(function(w) {
		out_obj.value = out_obj.value + w[0] +"\t"+ w[1] +"\n";
	});
	
	var file = 'data:text/tsv,' + encodeURIComponent(out_obj.value);
	download_obj.setAttribute('href',file);
	
	return false;
});