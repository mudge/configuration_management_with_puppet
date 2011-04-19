/* Automatically transition to the next slide after 20 seconds. */
(function nextSlide() {
  nextStep();
  if (slidenum !== slideTotal) {
    setTimeout(nextSlide, 20 * 1000);
  }
}());

/* Apply any slide content styles to the containing frame.
 * Modified from https://github.com/elabs/front_end_testing_talk/blob/master/talk.js
 */
setTimeout(function() {
  $(function() {
    $('div.content').each(function() {
      $(this).parent().addClass($(this).attr('class')).removeClass('content');
    });
  });
}, 500);
