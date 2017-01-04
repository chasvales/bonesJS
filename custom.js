var main_container = document.getElementById('main-content-wrapper');

var tpl_simple = {
	display: function(data){
		var html_template = '<h1>Simple Request / Sample 1</h1><h5>Request : '+data.title+'</h5><h5>Data Params: '+data.body+'</h5>';
		main_container.innerHTML = html_template;
	}
}
var tpl_withdata = {
	display: function(data){
		var html_template = '<h1>Simple Request With 1 data/ Sample 2</h1><h5>Request : '+data.title+'</h5><h5>Data Params: '+data.body+'</h5>';
		main_container.innerHTML = html_template;
	}
}

var tpl_multidata = {
	display: function(data){
		var html_template = '<h1>Simple Request With Multiple data/ Sample 2</h1><h5>Request : '+data.title+'</h5><h5>Data Params: '+data.body+'</h5>';
		main_container.innerHTML = html_template;
	}
}