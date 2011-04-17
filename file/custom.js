/* Automatically transition to the next slide after 20 seconds. */
(function nextSlide() {
  nextStep();
  if (slidenum !== slideTotal) {
    setTimeout(nextSlide, 20 * 1000);
  }
}());

