let currentUsers = []; //retain previousvalue
function generate(users) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    const nameType = document.getElementById('nameType').value;
    users.forEach(user => {
        const row = document.createElement('div');
        row.className = 'row mb-2';
        row.innerHTML = `
            <div class="col">${user.name[nameType]}</div>
            <div class="col">${user.gender}</div>
            <div class="col">${user.email}</div>
            <div class="col">${user.location.country}</div>
            `;
    resultsDiv.appendChild(row);
});
}
document.getElementById('generateBtn').addEventListener('click', () => {
    const errorDiv = document.getElementById('inputError');
    let count = parseInt(document.getElementById('resultCount').value, 10) || 10; //only integer
    if (count < 1 || count > 1000) {
        errorDiv.textContent = 'integer must be 0-1000';
        errorDiv.classList.remove('d-none');
        return;
    } else {
        errorDiv.classList.add('d-none');
    }
    fetch(`https://randomuser.me/api/?results=${count}`)
    .then((response) => response.json())
    .then((data) => {
        currentUsers = data.results;
        generate(currentUsers);
    })
    .catch((error) => console.error("Something went wrong"))
    .finally(() => console.log("done"));
});
document.getElementById('nameType').addEventListener('change', function() {
    generate(currentUsers);
});