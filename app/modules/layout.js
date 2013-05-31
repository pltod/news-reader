/**
 * Defines Views with static data used for shaping the application layout.
 */
define(["app", "bootstrap"], function(App) {
	
	"use strict";
	
	var Layout = App.module(
		{
			draw: function() {
				var views = {};
				views[App.placeholders.headerPlaceholder] = new Layout.Views.HeaderLV();
				views[App.placeholders.footerPlaceholder] = new Layout.Views.FooterLV();
				App.useLayout(App.layoutMain).setViews(views).render();
			}
		}
	);

	/**
	 * View for application header.
	 */
	Layout.Views.HeaderLV = App.MVC.View.extend({
		template : "layoutHeader",
		events : {
			"click .brand" : "loadNews"
		},
		loadNews : function() {
			App.trigger(App.customEvents.newsRequested);
		},
		afterRender : function() {
			$(".brand").tooltip();
		}
	});

	/**
	 * View for application footer
	 */
	Layout.Views.FooterLV = App.MVC.View.extend({
		template : "layoutFooter",
		tagName : "footer"
	});

	/**
	 * Compound layout view that combines displaying of information from two different modules - news and comment. 
	 */	
	Layout.Views.CommentsLV = App.MVC.View.extend({
		template : "comments",
		initialize : function(options) {
			this.setView("#parentNews", options.parentNewsView);
			this.setView("#comments", options.commentsView);
		}
	});

	
	return Layout;
});
