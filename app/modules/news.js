/**
 * News module. It defines the news model and its related views.
 */
define(["app", "blockUI"], function(App) {
	
	"use strict";

	var News = App.module({

		load: function() {
			var news = new News.Collection();
			$.blockUI({
				message : 'Loading news...',
				css : App.blockUIStyle
			});
			news.fetch({
				success : function(collection) { 
					var views = {};
					views[App.placeholders.contentPlaceholder] = new News.Views.NewsListCV({
						collection : collection
					}); 
					App.useLayout(App.layoutMain).setViews(views).render();
					$.unblockUI();
				},
				error : function() {
					$.unblockUI({
						onUnblock : function() { alert(App.errorMessage);
						}
					});
				}
			});
		}	
	});

	News.Model = App.MVC.Model.extend({
		defaults : {
			item_id : "News ID",
			title : "Title",
			url : "URL",
			score : "Score",
			user : "User",
			comments : "Number of Comments",
			time : "Posted at"
		},
		initialize : function() {
			//This helps Backbone to know which models are new on fetching and does not trigger add event for them.
			//So Backbone can do intelligently merge of the fetched models
			//However it still relies on the server API to return the same id for the same models each time 
			this.cid = this.get("item_id");
		}
	});

	News.Collection = App.MVC.Collection.extend({
		model : News.Model,

		url : function() {
			//Best: return "http://hndroidapi.appspot.com/best/format/json/page/?appid=&callback=?";
			//Newest: return "http://hndroidapi.appspot.com/newest/format/json/page/?appid=&callback=?"

			//Home page:
			return "http://hndroidapi.appspot.com/news/format/json/page/?appid=&callback=?";
		},
		parse : function(data) {
			if (data!==undefined && data !== null) {
				if (data.items !== undefined && data.items !== null) {
					return data.items.slice(0, 10);		
				}				
			}
		}
	});
	
	//News displayed as a list item
	News.Views.NewsListItemMV = App.MVC.BaseModelView.extend({
		
		template : "newsItem",
		className : "alert alert-info span7 item",
		tagName : "li",
		
		events : {
			"click .btn" : "loadComments"
		},
		loadComments : function() {
			App.trigger(App.customEvents.commentsRequested, this.model);
		}
	});

	//News displayed inside a div
	News.Views.NewsDivMV = App.MVC.BaseModelView.extend({
		
		template : "newsParentItem",
		className : "alert alert-warning span8 offset1 shadow",
		
		events : {
			"click .btn" : "loadNews"
		},
		loadNews : function() {
			App.trigger(App.customEvents.newsRequested);
		}
	});

	//News collection displayed as unordered list
	News.Views.NewsListCV = App.MVC.BaseCollectionView.extend({
		
		className : "span8 offset1 padded shadow",
		tagName : "ul",
		child: News.Views.NewsListItemMV
		
	});
	

	return News;
});
