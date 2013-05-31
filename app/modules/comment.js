/**
 * Comment module. It defines the comment model and its related views.
 */
define(["app"], function(App) {
	
	"use strict";

	var Comment = App.module({
		loadFor: function(news) {
			var promiseToLoadComments = $.Deferred(),
				comments = new Comment.Collection({
					newsId : news.get("item_id")
				});
			$.blockUI({
				message : 'Loading comments...',
				css : App.blockUIStyle
			});
			comments.fetch({
				success : function(collection) {
					$.unblockUI();
					promiseToLoadComments.resolve(new Comment.Views.CommentListCV({
								collection : collection
							}));
				},
				error : function() {
					$.unblockUI();
					promiseToLoadComments.reject();
				}
			});
			return promiseToLoadComments;
		}
	});

	Comment.Model = App.MVC.Model.extend({
		defaults : {
			username : "User",
			comment : "Comment",
			time : "time"
		}
	});

	Comment.Collection = App.MVC.Collection.extend({
		model : Comment.Model,
		initialize : function(options) {
			if(options !== undefined && options !== null) {
				this.newsId = options.newsId;
			}
		},
		url : function() {
			return "http://hndroidapi.appspot.com/nestedcomments/format/json/id/" + this.newsId + "?appid=&callback=?";
		},
		parse : function(data) {
			if (data!==undefined && data !== null) {
				if (data.items !== undefined && data.items !== null) {
					return data.items.slice(0, 20);
				}				
			}
		}
	});
	
	//Comment displayed as a list item
	Comment.Views.CommentListItemMV = App.MVC.BaseModelView.extend({
		template : "commentItem",
		tagName : "li",
		className : "alert alert-info span7 item"
	});

	//Comment collection displayed as unordered list
	Comment.Views.CommentListCV = App.MVC.BaseCollectionView.extend({
		className : "span8 offset1 padded shadow",
		tagName : "ul",
		child: Comment.Views.CommentListItemMV
	});

	

	return Comment;
});
