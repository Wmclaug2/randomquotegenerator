var currentQuote = '', currentAuthor = '';

function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function getQuote(){
	$.ajax({
			url:"https://crossorigin.me/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
			success:function(data){
				var data = data.shift();
				currentQuote = data.content.replace(/<p[^>]*>/g, "").replace(/<\/p[^>]*>/g,"");
				currentAuthor = "- "+data.title;
				$(".quote-text").html(data.content);
				$('.author').html("<p>- "+ data.title+"</p>");
			},
			cache: false
		})
};

function getQuote2(){
	$.getJSON("https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en", function(json){
		$('.quote-text').html(json.quoteText);
	});
}

$(document).ready(function(){
	getQuote();
	$(".generate").on('click',function(e){
		e.preventDefault();
		getQuote();
	});
  $('.tweet').on('click', function() {
  	console.log(currentQuote);
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent(currentQuote + currentAuthor));
  });
});