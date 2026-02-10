(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  // if (select('.toggle-sidebar-btn')) {
  //   on('click', '.toggle-sidebar-btn', function(e) {
  //     alert("clicked");
  //     select('body').classList.toggle('toggle-sidebar')
  //   })
  // }



  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

})();

$('input[type=number]').on('keydown', function (e) {
  // Allow: backspace (8), delete (46), tab (9), escape (27), enter (13), period (110 or 190)
  if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey) || // Ctrl+A
      (e.keyCode === 67 && e.ctrlKey) || // Ctrl+C
      (e.keyCode === 86 && e.ctrlKey) || // Ctrl+V
      (e.keyCode === 88 && e.ctrlKey) || // Ctrl+X
      // Allow: home (36), end (35), left (37), right (39)
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      return; // Let it happen, don't do anything
  }

  // Prevent up (38) and down (40) arrow keys
  if (e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault();
  }

  // Ensure the key pressed is a number (0–9) from the main keyboard or numpad
  if ((e.keyCode < 48 || e.keyCode > 57) && // Main keyboard
      (e.keyCode < 96 || e.keyCode > 105)) { // Numpad
      e.preventDefault(); // Prevent the input if not a valid character
  }
});