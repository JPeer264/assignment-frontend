$(document).ready(() => {
  $('.a-better-confirm').draggable({
    axis: 'x',
    revert: true,
    stop: (e, obj) => {
      $(obj.helper).removeClass('show')
    },
    drag: (e, obj) => {
      $(obj.helper).addClass('show')

      if (obj.position.left > 0) {
        e.preventDefault();
        obj.originalPosition.left = 0;

        $(obj.helper).addClass('a-better-confirm--confirmed')
        $(obj.helper).draggable('destroy')
      }
    }
  });
});