var JSTasker = {
  updateTaskCounter: function() {
    var taskCount = $('div#tasks ul').children().not('li.completed').size();
    $('span#task_counter').text(taskCount);
  },
  sortTasks: function() {
    var taskList = $('div#tasks ul');
    var allCompleted = $(taskList).children('li.completed');
    $(allCompleted).detach().appendTo(taskList);
  },
  updatePage: function() {
    this.updateTaskCounter();
    this.sortTasks();
  }
};

$(function() {
  $('form#add_task').on('submit', function(e) {
    e.preventDefault();
    var $taskText = $('input#task_text').val()
//    var taskListItem = ('<li>' + $taskText + '</li>')
    var $taskListItem = $('<li>' + $taskText + '</li>') //jqeuryized
    $('ul').append($taskListItem);
    $('input#task_text').val('');
//    $taskListItem.on('click', function(e) {
//      $(this).toggleClass('completed');
//    });
    JSTasker.updatePage()
  });

  $('body').on('click', 'ul li', function(e) {
    e.preventDefault()
    $(this).toggleClass('completed');
    JSTasker.updatePage()
  });
});
