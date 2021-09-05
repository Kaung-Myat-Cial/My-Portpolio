$(window).on('load',function(){
	Core = new Core();
	Core.init();
});
function Core(){ }

Core.prototype = (function(){

	var _getInfo = function(url, type){


			var query = "select distinct ?o where { <"+url+"> <http://dbpedia.org/ontology/abstract> ?o .  FILTER ( LANG (?o) = 'en') } LIMIT 100";
			$.ajax({
				url: "https://dbpedia.org/sparql?query="+query,
				type: "GET",
				headers: {
					accept: "application/json"
				}

			}).done(function(data){

console.log(data);
				for(let i=0; i < data.results.bindings.length; i++){


					var div = $('<div/>',{
						html: data.results.bindings[i].o.value,
						style: 'border: 1px solid red; border-radius: 5px;font-size:11px;'
					});

					$('.btn.btn-info[content="'+type+'"]').siblings().append(div);

				}
			});
	};

	var _setEvent = function(){


		$('.btn.btn-info').on('click',function(){

			var type = $(this).attr('content');
			var url = $(this).attr('ref');

			switch(type){
				case "info-ada":
					_getInfo(url, type);
					break;
				case "info-neil":
					_getInfo(url, type);
					break;
				case "info-data":
					_getInfo(url, type);
					break;
			}

		});
	};

	return {

		init: function(){
	
			_setEvent();
		}

	}
})();


