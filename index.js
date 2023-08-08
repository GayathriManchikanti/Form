document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const dobInput = document.getElementById('dob');
    const dobValidation = document.getElementById('dob-validation');
    const tableBody = document.querySelector('#registration-table tbody');

    // Load entries from local storage on page load
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    storedEntries.forEach(entry => addEntryToTable(entry));

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const currentDate = new Date();
        const dob = new Date(dobInput.value);
        const age = currentDate.getFullYear() - dob.getFullYear();

        if (age < 18 || age > 55) {
            dobValidation.textContent = 'Age should be between 18 and 55 years.';
            return;
        } else {
            dobValidation.textContent = '';
        }

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const acceptedTerms = form.terms.checked;

        if (name && email && password && acceptedTerms) {
            // Create an entry object
            const entry = {
                name: name,
                email: email,
                password: password,
                dob: dobInput.value,
                acceptedTerms: acceptedTerms
            };

            // Add data to the table
            addEntryToTable(entry);

            // Save the entry to local storage
            const entries = JSON.parse(localStorage.getItem('entries')) || [];
            entries.push(entry);
            localStorage.setItem('entries', JSON.stringify(entries));

            // Clear form inputs
            form.reset();
        } else {
            alert('Please fill in all the required fields and accept the terms.');
        }
    });

    function addEntryToTable(entry) {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `<td>${entry.name}</td><td>${entry.email}</td><td>${entry.password}</td><td>${entry.dob}</td><td>${entry.acceptedTerms ? 'True' : 'False'}</td>`;
    }
});
