/**
 * reegle Climate Tagger CKAN Extension javascript
 * @author jweers
 * @collaborator United Nations Energy Partnership (UNEP) 
 * @collaborator U.S. National Renewable Energy Laboratory (NREL)
 * @collaborator Renewable Energy and Energy Efficiency Partnership (REEEP)
 * @license Creative Commons CC-Zero
 * 
 * @requires reegle Tagging API Key
 * - You must procure your own key and add it to the config section below!
 */


/*
 * CONFIGURE THE API
 * use the object below to adjust the behavior of the API
 */
var reegle = {
  apiUrl: 'http://api.reegle.info/service/extract',
  minimumContentLength: 2,    // = 1 character in each field
  locale: 'en',               //Language
  countConcepts: 9,           //Number of concepts returned by the API
  countTerms: 9,              //Number of terms returned by the API
  authToken: 'your-auth-token-here!'
};


/*
 * ON LOAD
 */
$(document).ready(function(){
  //Check to see if the tags field exists before loading module
  if($('#field-tags').is(':visible')){
    reegle_loadExtension();
  }
});


/*
 * Supporting Functions
 */

/**
 * Assembles the custom input field which will eventually house the tags
 *  suggested by the reegle Tagging API, and initiates suggestion
 * @return null
 */
function reegle_loadExtension(){
  reegle.container = $('<div id="reegleTagsContainer">Loading...</div>');
  var $tagsField = $('#field-tags');
  
  //Create suggested tags field group
  var $controlGroup = $('<div class="control-group control-full"></div>')
    .append('<label class="control-label" for="reegle-tags_autogen">Suggested Tags</label>')
    .insertAfter($tagsField.parents('.control-group'));
  var reegleLink = '<a href="http://api.reegle.info/" target="_blank" tabindex="-1">' +
    '<img src="/img/reegle-logo.png" alt="reegle" height="14px" width="44px"/>' + '</a>&trade;';
  var $helpBlock = $('<span class="reegle-info-block"></span>')
    .html('Click appropriate tags to apply them.  Tags suggested by the ' + reegleLink + ' Climate Tagger.');
  $('<div class="controls"></div>')
    .append(reegle.container)
    .append($helpBlock)
    .appendTo($controlGroup);
  
  //Get the subject material
  var title = $('#field-title').val(), desc = $('#field-notes').val();
  if (title.length + desc.length > reegle.minimumContentLength){
    //Already have content, suggest tags
    reegle_suggestTags(title, desc);
  }else{
    //Wait for content to be populated, then suggest on description blur
    $('#field-notes').blur(function(){
      title = $('#field-title').val();
      desc = $(this).val();
      if (title.length + desc.length > reegle.minimumContentLength){
        reegle_suggestTags(title, desc);  
      }
    });
  }
}

/**
 * Passes the contents of the title and description to the reegle Tagging API, 
 *  then processes the returned response into a list of strings and displays
 *  them as suggested tags in a custom input field attached to the resource form.
 * @param title string title of the resource
 * @param desc string resource description
 * @return null
 */
function reegle_suggestTags(title, desc){
  desc = reegle_stripMarkdown(desc);
  var params = {
    locale: reegle.locale,
    format: 'jsonp',  //jsonld ??
    countConcepts: reegle.countConcepts,
    countTerms: reegle.countTerms,
    token: reegle.authToken,
    title: title,
    text: desc
  };
  
  //Fetch the tags from the API
  $.ajax({
    url: reegle.apiUrl,
    type:"POST",
    xhrFields: {
      withCredentials: false
    },
    dataType: 'json',
    data: params,
    success: function(response){
      if (response.error){
        reegle_showAlert('Error: ' + response.error);
        return;
      }
      if (!response.concepts || !response.terms){
        reegle_showAlert('Something went wrong! Unable to suggest tags');
        return;
      }
      //Assemble tags
      var tags = [];
      for (c in response.concepts){
        tags.push(response.concepts[c].prefLabel);
      }
      for (t in response.terms){
        tags.push(response.terms[t].label);
      }

      //Handle null results
      if (tags.length == 0){
        reegle_showAlert('No suggested tags');
        return;
      }

      //Display results
      reegle.container.empty();
      for (i in tags){
        reegle_suggestTag(tags[i]);
      }


      //Initiate controls
      $('a.reegle-add-tag-btn').click(function(e){
        e.preventDefault();
      });
      $('.reegle-tag').click(function(){
        var tag = $(this).find('.reegle-tag-value').text();
        $(this).fadeOut(150, function(){
          reegle_addTag(tag);  
        });
      });
    } //end ajax success
  }); //end ajax
}

/**
 * Adds the supplied string to the suggested tags list in
 *  the input field created by this extension
 * @param str string tag to be suggested
 * @return null
 */
function reegle_suggestTag(str){
  $('<span class="reegle-tag"></span>')
    .append('<a href="#" class="reegle-add-tag-btn">+</a>')
    .append('<span class="reegle-tag-value">' + str + '</span>')
    .appendTo(reegle.container);
}

/**
 * Adds the supplied string as a tag to the "select2" tags field
 * @dependency current "select2" tags mechanism
 * @param str string tag to be added
 * @return null
 */
function reegle_addTag(str){
  if (str == undefined || trim(str) == ''){
    return;
  }
  var tags = $('#field-tags').select2('val');
  tags.push(str);
  $('#field-tags').select2('val',tags);
}

/**
 * removes markdown syntax from fields that support it, like description
 * CKAN uses Daring Fireball markdown: http://daringfireball.net/projects/markdown/syntax
 * @param str multi-line string to be cleansed
 * @return string
 */
function reegle_stripMarkdown(str){
  if (!str){
    return '';
  }
  //Remove blockquotes, bullets and headers
  str = str.replace(/^[i*+\-#=>]+ ?/mg,'');
  //Remove bolds and italics
  str = str.replace(/[*_]+([\w ]+)[*_]+/g,'$1');
  return str;
}

/**
 * Display reegle API error message
 * @param str error message
 * @return null
 */
function reegle_showAlert(str){
  reegle.container.html('<small class="text-error">' + str + '</small>');
}

/**
 * Trim whitespace from a string.
 * @param str string to be trimmed. ('   example ')
 * @return string ('example')
 * @author jon weers
 */
function trim(str) {
  if (str){
    return str.replace(/^\s+|\s+$/g,"");
  }else{
    return "";
  }
}
