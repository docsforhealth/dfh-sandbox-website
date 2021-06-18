import SlickCarousel from 'slick-carousel';
import $ from 'jquery';
import 'lity';
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
  $('[data-slick-nav-target-id][data-slick-nav-method]').on(
    'click',
    function() {
      const $this = $(this),
        targetSelector = `#${$this.data('slickNavTargetId')}`,
        targetMethod = $this.data('slickNavMethod');
      $(targetSelector).slick(targetMethod);
    },
  );

  $('.nav__menu-toggle').on('click', function() {
    $('.nav').toggleClass('nav--open');
    $('.nav__links-container').slideToggle('fast');
  });

  $('[data-toggle-container-class]').on('click', function() {
    if (this.dataset) {
      const $this = $(this),
        {
          toggleContainerClass,
          toggleContainerOpenClass,
          toggleOpenWord,
          toggleCloseWord,
        } = this.dataset;
      if (toggleContainerClass && toggleContainerOpenClass) {
        $this
          .parents('.' + toggleContainerClass)
          .toggleClass(toggleContainerOpenClass);
      }
      if (toggleOpenWord && toggleCloseWord) {
        const oldMarkup = $this.html(),
          newMarkup = oldMarkup.includes(toggleOpenWord)
            ? oldMarkup.replace(toggleOpenWord, toggleCloseWord)
            : oldMarkup.replace(toggleCloseWord, toggleOpenWord);
        $this.html(newMarkup);
      }
    }
  });

  // see https://github.com/jsor/lity#events
  $(document).on('lity:ready lity:remove', function(event, instance) {
    const $triggerEl = instance.opener(),
      $lityEl = instance.element();
    if (event && event.target && $triggerEl) {
      const {
        lityOverrideModalClass,
        lityOverrideContainerClass,
      } = $triggerEl.data();
      if (lityOverrideModalClass) {
        event.target.classList.toggle(lityOverrideModalClass);
      }
      if (lityOverrideContainerClass) {
        $lityEl.find('.lity-container').addClass(lityOverrideContainerClass);
      }
    }
  });
});

function setCategoryActive(sliderEl, index) {
  const activeClass = sliderEl.dataset.slickActiveClass;
  $(`[data-slick-nav-target-id=${sliderEl.id}]`)
    .removeClass(activeClass)
    .filter(`[data-slick-nav-target-index=${index}]`)
    .addClass(activeClass);
}
