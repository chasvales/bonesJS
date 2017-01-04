var screenHistory = new Array();
var dataURI = 'https://jsonplaceholder.typicode.com/posts';

$(window).on('hashchange',function(){
	AppController.router();
});

var AppController = {
    buildEndpoint : function(endpoint){
    	// show loading
    	$('#loading').addClass('load');
    	var request_endpoint = endpoint.split('/');
    	var paramters = encodeURI(request_endpoint[2]);
// Your server will receive ['request'], ['params']
		$.ajax(dataURI, {
			method: 'POST',
			data: {
				title: request_endpoint[1],
				body: request_endpoint[2]
			}
		}).then(function(data) {
			// hide loading
			$('#loading').removeClass('load');
			AppController.template_structure({
				'template' : request_endpoint[1],
				'data' : data
			});
		});
    },
    router: function(firstLoad){
		var current_page = window.location.hash;
			screenHistory.push(current_page);
			current_page = current_page.split('/');
			AppController.buildEndpoint('/'+current_page[1]+'/'+current_page[2]);
	},
	template_structure : function(props){
		var template_compiler = props.template;
		var template_data = props.data;
		var flag = props.flag;
		var template_name = 'tpl_'+template_compiler;
// load / run the template
		window[template_name].display(template_data);
	}
}
