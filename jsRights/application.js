//ROUND 2 PLUGIN w/ JJ
(function($) {
  var TableOfContents = function($header, $articles) {
    this.tocTemplate = '<h2>Table of Contents<ul></ul></h2>';
    this.topTemplate = '<a href="#top">Back to Top</a>';
    this.tocItemTemplate = "<li><a href='#{{slug}}'>{{title}}</a></li>";

    this.buildNavigation($header);
    this.buildArticleRefs($articles);
  };

  $.extend(TableOfContents.prototype, {

    buildNavigation: function($header) {
      $header.attr({id: 'top'});

      var $toc = $(this.tocTemplate);
      this.$list = $toc.find('ul'); // what if I change the template to not have a ul? I want an ol....

      $header.after($toc);
    },

    buildArticleRefs: function($articles) {
      for (var i = 0; i < $articles.length; ++i) {
        var $article = $($articles[i]);

        this._appendBackToTopLinkTo($article);
        this._addTocItemFor($article);
        this._buildArticleToggleFor($article);
      }
    },

    _appendBackToTopLinkTo: function($article) {
      $article.append(this.topTemplate);
    },

    _addTocItemFor: function($article) {
      var title = $article.find('h2').text();
      var slug = title.trim().toLowerCase().replace(" ", "_");

      $article.attr({id: slug}); // maybe refactor? this seems like it might not belong here.

      var item = this.tocItemTemplate.replace('{{slug}}', slug).replace('{{title}}', title);
      this.$list.append(item);
    },

    _buildArticleToggleFor: function($article) {
      var $toggleLink = $("<a href='#'>(hide)</a>");
      $toggleLink.on('click', this._onToggleArticle.bind(this));
      $article.find('h2').after($toggleLink); // what if I'm not using h2?!
    },

    // event handlers

    _onToggleArticle: function(e) {
      e.preventDefault();
      var $a = $(e.target);

      $a.text(($a.text() === '(hide)') ? '(show)' : '(hide)');
      $a.siblings('p').toggle();
    }
  });

  // jQuery plugin
  $.fn.tableOfContentsFor = function($articles) {
    new TableOfContents(this, $articles)
  };

})(jQuery);

// usage
jQuery(function () {
  $('h1').tableOfContentsFor($('.article'))
});

//ORIGINAL SOLUTION
//jQuery(function () {
//  var backToTop = "<a href='#top'>Back to Top</a>";
//  var tableOfContents = "<h2 id='toc_header'>Table of Contents</h2>"
//  var unorderedList = "<ul id='toc_list'>"
//
//  $("div.article").tableOfContents($('h1'));
//
//  $("div.article").append(backToTop);
//  $("h1").after(tableOfContents);
//  $("h2:first").after(unorderedList);
//  $("div.article h2").css("background-color", "magenta");
//  $("div.article h2").each(function (){
//    var title = $(this).text();
//    var slug = title.trim().toLowerCase().replace(" ", "_");
//    $(this).attr('id', slug);
//
//    var listItem = "<li><a href='#" + slug + "'>" + title + "</a></li>";
//    $("ul#toc_list").append(listItem);
//
//    var toggleLink = $("<a href='#'>(hide)</a>");
//    toggleLink.on('click', function (event) {
//      event.preventDefault();
//      $(this).siblings('p').toggle();
//      var oldText = $(this).text();
//      var newText = (oldText === '(hide)') ? '(show)' : '(hide)';
//      $(this).text(newText);
//    });
//    $(this).after(toggleLink)
//
//  });
//});

//ROUND 1 PLUGIN
//$.fn.tableOfContents = function(header) {
//  var backToTop = "<a href='#top'>Back to Top</a>";
//  var toc_header = "<h2 id='toc_header'>Table of Contents</h2>"
//  var toc_list = "<ul id='toc_list'>"
//  this.append(backToTop);
//  var header = $("h1");
//  header.after(toc_header);
//  $("h2:first").append(toc_list);
//  this.find('h2').each(function () {
//    var title = $(this).text();
//    var slug = title.trim().toLowerCase().replace(" ", "_");
//    $(this).attr('id', slug);
//
//    var listItem = "<li><a href='#" + slug + "'>" + title + "</a></li>";
//    $("ul#toc_list").append(listItem);
//
//    var toggleLink = $("<a href='#'>(hide)</a>");
//    toggleLink.on('click', function (event) {
//      event.preventDefault();
//      $(this).siblings('p').toggle();
//      var oldText = $(this).text();
//      var newText = (oldText === '(hide)') ? '(show)' : '(hide)';
//      $(this).text(newText);
//    });
//    $(this).after(toggleLink)
//  });
//};
//
//jQuery(function () {
//  $("div.article").tableOfContents($('h1'));
//});
