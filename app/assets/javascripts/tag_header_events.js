/*

Handle the tag header button clicks
each function is attached on the base of the data-header-button value
Code in provided inline, in the future it can be moved out

used for _tag_header partial

*/

(function(jQuery) {
	
	function tag_header_toggle(elem) {
		tag_container = elem.parents(".tag_container");
		collapsable = tag_container.children(".tag_content_collapsable");
		
		// toggle
		collapsable.slideToggle(0);
	
		span = elem.children("span");
	
		if (collapsable.css("display") == "none") {
			span.removeClass('ui-icon-triangle-1-s');
			span.addClass('ui-icon-triangle-1-w');
		} else {
			span.removeClass('ui-icon-triangle-1-w');
			span.addClass('ui-icon-triangle-1-s');
		}
	}
	
	function tag_header_delete(button_id) {
		// FIXME dialog should not be hardcoded
		$('#dialog').html('<p>' + delete_field_confirm + '</p>');
		$("#dialog").dialog();
		$("#dialog").dialog( 'option', 'title', delete_msg );
		$("#dialog").dialog( 'option', 'width', 300);
		$("#dialog").dialog( 'option', 'buttons', {
			OK: function() {
				
				dt_id = button_id.parents(".tag_toplevel_container");
				tag = dt_id.data("tag");
	
				// Enable the tag menu
				tag_menu = dt_id.parents(".panel_content");
				tag_menu.find("[value=" + tag + "]").removeAttr("disabled");
	
				dt_id.fadeOut('fast', function() {
					dt_id.remove();
				});
				
				$(this).dialog('close');
			},
			Cancel: function() { $(this).dialog('close');	}
			});
		$("#dialog").dialog('open');
	}
	
	function tag_header_add(elem) {
		placeholder = elem.parents(".tag_group").children(".tag_placeholders");
		current_dt = elem.parents(".tag_toplevel_container");

		new_dt = placeholder.clone();
		new_dt.toggleClass('tag_placeholders tag_toplevel_container');
		new_dt.insertAfter(current_dt);
		new_dt.fadeIn('fast');
	}

	function tag_header_edit(elem) {
		dt = elem.parents(".tag_toplevel_container");
	
		show_id = dt.find('.tag_container[data-function="edit"]');
		hide_id = dt.find('.tag_container[data-function="new"]');

		
	    $(hide_id).fadeOut('fast', function(){
	        $(show_id).fadeIn('fast');
	    });
	}
	
	function tag_header_new(elem) {
		dt = elem.parents(".tag_toplevel_container");

		var show_id = dt.find('.tag_container[data-function="new"]');
		var hide_id = dt.find('.tag_container[data-function="edit"]');

	    $(hide_id).fadeOut('fast', function(){
	        $(show_id).fadeIn('fast');
	    });
	}
	
	var self = null;
	jQuery.fn.tagHeaderButtons = function() {
		var handler = function() {
			if (!this.tagHeaderButtons) {
				this.tagHeaderButtons = new jQuery.tagHeaderButtons(this);
			}
		};
		
		if (jQuery.fn.on !== undefined) {
			return jQuery(document).on('mousedown', this.selector, handler);
		} else {
			return this.live('mousedown', handler);
		}
	};

	jQuery.tagHeaderButtons = function (e) {
		_e = e;
		this.init(_e);
	};

	jQuery.tagHeaderButtons.fn = jQuery.tagHeaderButtons.prototype = {
		tagHeaderButtons: '0.0.1'
	};

	jQuery.tagHeaderButtons.fn.extend = jQuery.tagHeaderButtons.extend = jQuery.extend;
	jQuery.tagHeaderButtons.fn.extend({
		init: function(e) {
			$(e).click(function(e) {
				e.preventDefault();
				
				if ($(this).data("header-button") == "toggle") {
					tag_header_toggle($(this));
				} else if ($(this).data("header-button") == "delete") {
					tag_header_delete($(this));
				} else if ($(this).data("header-button") == "add") {
					tag_header_add($(this));
				} else if ($(this).data("header-button") == "new") {
					tag_header_new($(this));
				} else if ($(this).data("header-button") == "edit") {
					tag_header_edit($(this));
				}
				
			});
		}
	});
  
	jQuery(document).ready(function(){
		jQuery('.abutton').tagHeaderButtons();
	});
})(jQuery);
