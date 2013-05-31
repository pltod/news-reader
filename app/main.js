/**
 * The application bootstrapper.
 * It loads the application container and all the neede modules.
 */
require(["app", "modules/layout", "modules/news", "modules/comment"], 

function(App, Layout, News, Comment) {

	//Handlers for specific events
	App.on(App.customEvents.newsRequested, function() {
		News.load();
	});

	App.on(App.customEvents.commentsRequested, function(news) {

		//The application must do something when the comments are loaded
		//So the loadFor method is implemented with the help of jQuery deffered
		var promiseToLoadComments = Comment.loadFor(news);

		promiseToLoadComments.done(function(commentsView) {
			views = {};
			views[App.placeholders.contentPlaceholder] = new Layout.Views.CommentsLV({
				parentNewsView : new News.Views.NewsDivMV({
					model : news
				}),
				commentsView : commentsView
			});
			App.useLayout(App.layoutMain).setViews(views).render();
		});

		promiseToLoadComments.fail(function() {
			alert(App.errorMessage);
		});
	});

	//Draws the static layout
	Layout.draw();
	
	//Loads dynamic content
	News.load();

	/**
	 * SPA application. All the clicks are processed in this handler.
	 * Currently it just prevents the page refresh when click on anchor elements. 
	 * Links with 'data-bypass' attribute are not handled here and have a normal behaviour.
	 * 
	 */
	$(document).on("click", "a:not([data-bypass])", function(evt) {
		// Stop the default event to ensure the link will not cause a page refresh.
		evt.preventDefault();
	});
});
