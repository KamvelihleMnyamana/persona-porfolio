document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('testimonial-form');
    const nameInput = document.getElementById('name');
    const testimonialInput = document.getElementById('testimonial-text');
    const testimonialList = document.getElementById('testimonial-list');
  
    // Load existing testimonials from localStorage
    loadTestimonials();
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const name = nameInput.value;
      const testimonial = testimonialInput.value;
      const rating = document.querySelector('input[name="rating"]:checked')?.value; // Get selected rating
  
      if (name && testimonial && rating) {
        const newTestimonial = { name, testimonial, rating };
  
        // Save testimonial to localStorage
        let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials.push(newTestimonial);
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
  
        // Clear form inputs
        nameInput.value = '';
        testimonialInput.value = '';
        document.querySelectorAll('input[name="rating"]').forEach(input => input.checked = false);
  
        // Reload testimonials
        loadTestimonials();
      } else {
        alert("Please fill out all fields and select a rating.");
      }
    });
  
    // Function to display all testimonials
    function loadTestimonials() {
      testimonialList.innerHTML = ''; // Clear the current list
      const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
  
      testimonials.forEach((item) => {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.classList.add('testimonial-item');
        
        // Create a star rating for the testimonial
        let starRating = '';
        for (let i = 0; i < 5; i++) {
          if (i < item.rating) {
            starRating += '&#9733;'; // Filled star
          } else {
            starRating += '&#9734;'; // Empty star
          }
        }
  
        testimonialDiv.innerHTML = `
          <strong>${item.name}</strong>
          <p>${item.testimonial}</p>
          <p>Rating: ${starRating}</p>
        `;
        testimonialList.appendChild(testimonialDiv);
      });
    }
  });
  
  const stars = document.querySelectorAll('.star-rating input');
const labels = document.querySelectorAll('.star-rating label');

function handleStarRating(event) {
  const selectedRating = event.target.value;

  labels.forEach((label, index) => {
    if (index < selectedRating) {
      label.style.color = 'gold';  // Set selected stars to gold
    } else {
      label.style.color = '#ccc';  // Set unselected stars to light gray
    }
  });

  document.getElementById('rating-output').textContent = `You rated: ${selectedRating} stars`;
}

stars.forEach(star => {
  star.addEventListener('change', handleStarRating);
});
