function submitProfile(evt) {
  evt.preventDefault();

  const data = {
    name: document.querySelector('#name-field').value,
    age: document.querySelector('#age-field').value,
    occupation: document.querySelector('#occupation-field').value,
    salary: document.querySelector('select[name="salary"] option:checked').value,
    education: document.querySelector('select[name="salary"] option:checked').value,
    state: document.querySelector('#state-field').value,
    cityType: cityTypeToArr(document.querySelectorAll('input[name="city"]:checked')),
    garden: document.querySelector('input[name="garden"]:checked').value,
    tv: document.querySelector('select[name="tv"] option:checked').value,
  };

  function cityTypeToArr(arr) {
    const values = [];
    for (node of arr) {
      values.push(node.value);
    }

    return values;
  }

  fetch('/api/profile', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json,',
    },
  })
    .then((response) => response.json())
    .then((obj) => {
      const element = document.querySelector('#profiles');
      for ([key, value] of Object.entries(obj)) {
        const str = `<div>${key}: ${value}<div>`;
        element.insertAdjacentHTML('beforeend', str);
      }
    })
  // make request to server to get the data
  // add the data the server returns to the document
  // (you can add it to the end of the div with ID "profiles")
}

document.querySelector('#profile-form').addEventListener('submit', submitProfile);
