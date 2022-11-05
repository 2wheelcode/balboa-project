// Mobile Menu Button
const btn = $("#menu-btn");
const menu = $("#menu");

btn.click(navToggle);
let mobileMenuOpen = false;
function navToggle() {
    btn.toggleClass('open');
    menu.toggleClass('flex');
    menu.toggleClass('hidden');

    mobileMenuOpen = !mobileMenuOpen;

    $('body').toggleClass('overflow-hidden');
    $('nav').first().toggleClass('h-screen')
}

// Animate On Scroll
AOS.init({
    once: true,
});

// Subscribe Btn Action
const scriptURL = 'https://script.google.com/macros/s/AKfycbzbniPzDhvKO3kEIuSoImYI-vUPGLJudnuIRAdMNu1TYLQM1PDLSpJ4q5L7nKZNu5J-/exec'

// Subscribe Button Function
$(".email-sign-form").submit(function(e){
    let $msg = $(this).siblings('.sub-msg')
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(this)})
    .then(response => {
        $msg.html('Thank you for Subscribing!')
        setTimeout(function() {
            $msg.html('')
        },3500)
        $(this).trigger("reset");
    })
    .catch(error => console.error('Error!', error.message))
})

// Open Socials Modal Menu Button
const socialsBtn = document.getElementById('socials-btn');
const socialsCloseButton = document.getElementById('socials-close-btn');
const socialsWrapper = document.getElementById('socials-wrapper');
const socialsModal = document.getElementById('socials-modal');


socialsCloseButton.addEventListener('click', socialsToggle);
socialsBtn.addEventListener('click', socialsToggle);

function socialsToggle() {
    document.getElementsByTagName('body').item(0).classList.toggle('overflow-hidden');
    socialsWrapper.classList.toggle('block');
    socialsWrapper.classList.toggle('hidden');
}

// Contact Form
// Open Contact Form
$('.contact-btns').click(contactToggle);

const contactFormCloseButton = $('#contact-us-close-btn');
const contactFormWrapper = $('#contact-form-wrapper');
const contactForm = $('#contact-form');
const formSubmitButton = $('#submitBtn');
const appointmentBtn = $('#appointment');

contactForm.submit(function (event) {
    event.preventDefault();
});

contactFormCloseButton.click(contactToggle)
appointmentBtn.click(contactToggle);
formSubmitButton.click(submitForm2);

function contactToggle() {
    if(!mobileMenuOpen) {
        $('body').toggleClass('overflow-hidden');
    }
    contactFormWrapper.toggleClass('block');
    contactFormWrapper.toggleClass('hidden');
}

// Contact Form with Ajax & PHP
function submitForm2() {
    $('#contact-dots').html('please wait...');
    let formdata = new FormData();
    formdata.append('name', $('#name').val());
    formdata.append('email', $('#email').val());
    formdata.append('subject', $('#subject').val());
    formdata.append('message', $('#message').val());
    $.ajax({
        url: 'action-page.php',
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
    })
        .done(function () {
            $('#contact-dots').html('<h2>Thanks ' + $('#name').value + ', your message has been sent. <br>Charles will be in touch with you shortly</h2>');
        })
        .fail(function () {
            alert("error");
        })
        .always(function () {
            contactToggle();
            cleanUpForm();
        });
}

function cleanUpForm() {
    $('#contact-dots').html('');
    contactForm.get(0).reset()
}


// Default First Accordion Item Open
// REMOVE Comment to trigger default first accordion item open
/* $(function(){
    $('.accordion-item-header').eq(0).trigger('click');
  }); */
  
  // Accordion Button
  $(".accordion-item-header").click(
      event => {
          let accordionItemHeader = $(event.target);
  
              // Leave Uncommented if you only want to allow for the display of only one collapsed item at a time!
              const currentlyActiveAccordionItemHeader = $(".accordion-item-header.active");
              if (currentlyActiveAccordionItemHeader && !currentlyActiveAccordionItemHeader.is(accordionItemHeader)) {
                  currentlyActiveAccordionItemHeader.toggleClass("active");
                  currentlyActiveAccordionItemHeader.next().css("maxHeight", '0');
              }
  
          accordionItemHeader.toggleClass('active');
          const accordionItemBody = accordionItemHeader.next();
          if (accordionItemHeader.hasClass("active")) {
              accordionItemBody.css("maxHeight", `${accordionItemBody.get(0).scrollHeight}px`);
          } else {
              accordionItemBody.css("maxHeight", '0');
          }
  
      }
  );
