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
    router: function(){
		var current_page = window.location.hash;
			screenHistory.push(current_page);
			current_page = current_page.split('/');
			AppController.buildEndpoint('/'+current_page[1]+'/'+current_page[2]);
	},
	back_router : function(){
		var p = screenHistory.length - 1;
		var current_screen = window.location.hash;
	// IF THE LAST SCREEN VISITED IS THE CURRENT SCREEN REMOVE THE LAST ARRAY
		if(screenHistory[p] == current_screen){
			screenHistory.splice(p, 1);
			// THE NUMBERS ARE OFF BY ONE AFTER THE INITIAL CLICK OF BACK
			p = p - 1;
		}
		// DEFINE LAST SCREEN
		var last_screen = screenHistory[p];		
			last_screen = last_screen.split('/');
		// LOAD CONTENT FROM PREVIOUS PAGE
		AppController.buildEndpoint('/'+last_screen[1]+'/'+last_screen[2]);
		// UPDATE SCREEN TITLE
		page_title.innerHTML = last_screen[1];
		// CHECK IF IS THE LAST SCREEN IN THE HISTORY
		if(p == 0){
			window.location.hash = '#/'+last_screen[1]+'/'+last_screen[2];
		}
		// REMOVE FROM ARRAY
		screenHistory.splice(p, 1);
	},
	template_structure : function(props){
		var template_compiler = props.template;
		var template_data = props.data;
		var template_name = 'tpl_'+template_compiler;
// load / run the template
		window[template_name].display(template_data);
	}
}
