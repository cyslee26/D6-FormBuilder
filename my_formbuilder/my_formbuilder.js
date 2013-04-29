Drupal.behaviors.selfservice = function() {
	$('#form-builder-positions').show();
	
	$('#form-builder-positions .form-submit').hide(); //don't display submit button inside form-builder-positions div tag
	
	if (typeof $('#my_formbuilder-category-form-fieldset .form-file').attr('id') != 'undefined') {
		$('#my_formbuilder-category-form-fieldset .form-file').attr('name', $('#my_formbuilder-category-form-fieldset .form-file').attr('id').replace('edit-new-', 'new_')+'[]');
	}
	
	$("[id$=-extranote-wrapper]").hide();
		
	$('#my_formbuilder-category-form-fieldset .form-select').change(function() {
		var id = '#'+$(this).attr('id') + '-extranote-wrapper';	
		var option_text = $(this).find("option:selected").text().toLowerCase();	
		var optval_id = id.replace('-extranote-wrapper', '-extranote-option');
		var option_value = $(optval_id).val();		
		if(option_text == option_value)	{			
			$(id).show();
		}
		else{
			$(id).hide();
		}
	});
	
		
	$('#my_formbuilder-category-form-fieldset .form-checkbox').click(function() {
	    var id = '#edit-'+ $(this).attr('name').replace('_', '-') + '-extranote-wrapper';
		id = id.replace('['+$(this).val()+']', '');		
				
		var n = $('#my_formbuilder-category-form-fieldset .form-checkbox:checked').length;
		if(n){
			$('#my_formbuilder-category-form-fieldset .form-checkbox:checked').each(function(index) {	
				var option_text = $.trim($(this).parent().text()).toLowerCase();				
				var optval_id = id.replace('-extranote-wrapper', '-extranote-option');
				var option_value = $(optval_id).val();
			
				if(option_text == option_value)	$(id).show();
				else	$(id).hide();
			});
		}
		else{
			$(id).hide();
		}
		
	});
	
	$('#my_formbuilder-category-form-fieldset .form-radio').click(function() {
		var option_text = $.trim($(this).parent().text()).toLowerCase();			
		var id = '#edit-'+ $(this).attr('name').replace('_', '-') + '-extranote-wrapper';	
		var option_value = $(id.replace('-extranote-wrapper', '-extranote-option')).val();
		
		if(option_text == option_value){			
			$(id).show();
		}
		else{
			$(id).hide();
		}
	});
	
	$('#my_formbuilder-category-form-fieldset').find('label').each(function(index) {			
		if(!$(this).attr('class').length){
			$(this).text($(this).text().substr(0, $.trim($(this).text()).length - 1));	
		}	
	});
			
	// Great success! All the File APIs are supported.
	$('.form-file').change(function(evt) {							
		//HTML5 is supported: check file size
		if (window.File && window.FileReader && window.FileList) {			
			var id = '#'+$(this).attr('id') + '-max-filesize';
			var max_size = $(id).val();		
			var files = evt.target.files; // FileList object
			 // later change to dynamic way
			
			// files is a FileList of File objects. List some properties.
			var output = [];
			for (var i = 0, f; f = files[i]; i++) 
			{
				if(f.size > max_size){
					output.push(' <strong>'+f.name+'</strong> is too big to upload');					
				}				
			}
						
			if(output.length){				
				var message = '<div class="message error">' + output.join('<br>') + '</div>';
				$('.tabs').append(message);
				$("#submit-email").attr("disabled", "disabled");
				return false;
			}
			else{
				$("#submit-email").removeAttr("disabled");				
				$('.message').remove();			
			}
		}	
	});		
};
