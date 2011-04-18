/* Automatically transition to the next slide after 20 seconds. */
(function nextSlide() {
  nextStep();
  if (slidenum !== slideTotal) {
    setTimeout(nextSlide, 20 * 1000);
  }
}());

setTimeout(function() {
  $(function() {
    $('div.content').each(function() {
      $(this).parent().addClass($(this).attr('class')).removeClass('content');
    });
  });
}, 500);
