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
        email: document.getElementById('phonenumber').value,
        product: document.getElementById('product').value,
        address: document.getElementById('address').value,
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
