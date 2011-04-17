/* Automatically transition to the next slide after 20 seconds. */
(function nextSlide() {
  nextStep();
  setTimeout(nextSlide, 20 * 1000);
}());

