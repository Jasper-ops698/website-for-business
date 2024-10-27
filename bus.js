document.getElementById('openModalBtn').onclick = function() {
    document.getElementById('orderModal').style.display = 'block';
}

document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('orderModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('orderModal')) {
        document.getElementById('orderModal').style.display = 'none';
    }
}

// Handle form submission
document.getElementById('orderForm').onsubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const orderData = {
        customerName: document.getElementById('customerName').value,
        phoneNumber: document.getElementById('phonenumber').value,
        product: document.getElementById('product').value,
        address: document.getElementById('address').value,
        items: [
            {
                product: document.getElementById('lunch').value,
                quantity: parseInt(document.getElementById('1').value),
                price: 200KES
            }
        ],
        total: 200KES * parsenInt(document.getElementById('1').value)
    };

    try {
        const response = await fetch('/api/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();
        alert(data.message); // Handle success or error message
        document.getElementById('orderModal').style.display = 'none'; // Close modal on success
    } catch (error) {
        console.error('Error placing order:', error);
        alert('There was an error placing your order. Please try again.');
    }
}
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
    slide.style.display = 'none';
  });
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  slides[slideIndex - 1].style.display = 'block';
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function changeSlide(n) {
  slideIndex += n;
  let slides = document.querySelectorAll('.slide');
  if (slideIndex > slides.length) { slideIndex = 1; }
  if (slideIndex < 1) { slideIndex = slides.length; }
  slides.forEach((slide, index) => {
    slide.style.display = 'none';
  });
  slides[slideIndex - 1].style.display = 'block';
}
