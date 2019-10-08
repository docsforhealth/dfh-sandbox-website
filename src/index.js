import SlickCarousel from 'slick-carousel';
import $ from 'jquery';
import './index.scss';

$(function() {
  $('[data-slick]')
    .on('init reInit', ({ target }, { currentSlide }) => {
      setCategoryActive(target, currentSlide);
    })
    .on('beforeChange', ({ target }, slick, currentSlide, nextSlide) => {
      setCategoryActive(target, nextSlide);
    })
    .slick();

  $('[data-slick-nav-target-id][data-slick-nav-target-index]').on(
    'click',
    function() {
      const $this = $(this),
        targetSelector = `#${$this.data('slickNavTargetId')}`,
        targetIndex = $this.data('slickNavTargetIndex');
      $(targetSelector).slick('slickGoTo', targetIndex);
    },
  );

  $('.nav__menu-toggle').on('click', function() {
    $('.nav').toggleClass('nav--open');
    $('.nav__links-container').slideToggle('fast');
  });
});

function setCategoryActive(sliderEl, index) {
  const activeClass = sliderEl.dataset.slickActiveClass;
  $(`[data-slick-nav-target-id=${sliderEl.id}]`)
    .removeClass(activeClass)
    .filter(`[data-slick-nav-target-index=${index}]`)
    .addClass(activeClass);
}
