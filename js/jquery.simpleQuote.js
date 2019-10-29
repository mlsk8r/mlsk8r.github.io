
$.fn.simpleQuote = function(){
	for( var arg = 0 ; arg < arguments.length ; arg++ )
		for( var key in arguments[arg] ){
			simpleQuoteFuncManager[key] = arguments[arg][key];
		}

	var simpleQuoteFuncManager = new simpleQuoteFunc();

	simpleQuoteFuncManager.setElement(this);
	simpleQuoteFuncManager.initCache();
	simpleQuoteFuncManager.startRolling();
}

/*
	Declare simpleQuote functionality.
	Includes all configurable parameters.
*/

var simpleQuoteFunc = function(){
	this.element = '';
	this.speed = 12000;
	this.currentElement = 0;
	this.isRolling = false;
	this.displayElement = '';
	this.quoteCache = []
	this.authorCache = []
	this.includeAuthor = false;
}

simpleQuoteFunc.prototype.setElement = function(element){
	this.element = element;
	this.displayElement = element.find('.display');
}

simpleQuoteFunc.prototype.initCache = function(){
	sqfm = this;
	this.element.children().each(function(index){
		if(!$(this).hasClass("display")){
			sqfm.quoteCache[index-1] = $(this).html();
			if($(this).attr("author"))
				sqfm.authorCache[index-1] = $(this).attr("author");
			else
				sqfm.authorCache[index-1] = "Anonymous";

			$(this).hide();
		}
	});
	this.displayElement.html(sqfm.quoteCache[0] + this.appendAuthor(0));
}

simpleQuoteFunc.prototype.startRolling = function(){
	var sqfm = this;
	setInterval(function(){sqfm.roll()}, sqfm.speed);
}

simpleQuoteFunc.prototype.roll = function(){
	sqfm = this;
	sqfm.currentElement = (sqfm.currentElement + 1) % sqfm.quoteCache.length;
	sqfm.displayElement.hide( ).html(sqfm.quoteCache[sqfm.currentElement] + sqfm.appendAuthor(sqfm.currentElement)).fadeIn(1000);
}

simpleQuoteFunc.prototype.appendAuthor = function(index){
	if(this.includeAuthor)
		return "<p id='author'> - "+ this.authorCache[index] + "</p>";
	else
		return "";
}
