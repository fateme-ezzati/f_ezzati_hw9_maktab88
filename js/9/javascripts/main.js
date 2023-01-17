function renderTable (sortBy = null) {

  const users = [...userData];
  tbody.html('');
  thead.html('');

  if (!!sortBy) {
    users.sort((a, b) => {
      const current = a[sortBy].toString();
      const next = b[sortBy].toString();

      return next.localeCompare(current, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });
  }

  if (users.length === 0) return;

  let data = ['row', ...Object.keys(users[0])]
  let tableColumns = $.map(data, function (column) {

    if (column === 'row') return `<th>${column}</th>`;

    return `<th onclick="renderTable('${column}')">${column}</th>`;

  }).join('')

  thead.html(`<tr>${tableColumns}</tr>`);

  let tableBody

  for (const [index, user] of users.entries()) {
    tableBody += `
        <tr onclick="renderReadUser(${user.uid})">
          <td>${index + 1}</td>
          <td>${user.uid}</td>
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.city}</td>
          <td>${user.personalCode}</td>
          <td>${user.phoneNumber}</td>
          <td>${user.position}</td>
        </tr>`;
  }

  tbody.html(`${tableBody}`)

};

renderTable();

function renderReadUser(uid) {
  resetModal();
  const user = userData.find(user => user.uid === uid);
  modalHeader.text('User info');
  modalBody.html(Object.keys(user).map(property => `<p><strong>${property}:</strong> ${user[property]}</p>`)
    .join(''))

  modalFooter.html(`
    <button class="button addData" onclick="renderUpdateUser(${uid})">update</button>
    <button class="button" onclick="deleteUser(${uid})">delete</button>`);

  modalOpen();

}

function renderUpdateUser(uid) {
  resetModal();

  const user = userData.find(user => user.uid === uid);
  modalHeader.text('Update user');

  modalBody.html(Object.keys(user)
    .map(property => {
      if (property === 'uid') {
        return `<input type="text" id="${property}" class="updateInputs" value="${user[property]}" placeholder="${property}" disabled/>`;
      }

      return `<input type="text" id="${property}" class="updateInputs" value="${user[property]}" placeholder="${property}"/>`;
    })
    .join('')) 

  modalFooter.html (`
    <button class="button addData" onclick="updateUser(${uid})">save</button>
    <button class="button" onclick="renderReadUser(${uid})">cancel</button>`);
}

function updateUser(uid) {
  const user = userData.find(user => user.uid === uid);
  const updateInputs = $("input[class='updateInputs']");
  console.log(updateInputs)

  for (const input of updateInputs) {
    if (input.value.trim() === '') return alert('invalid input');

    if (input.id === 'uid') {
      user[input.id] = Number(input.value);
      continue;
    }

    user[input.id] = input.value;
  }

  modalClose();
  renderTable();
}

function deleteUser(uid) {
  const user = userData.find(user => user.uid === uid);
  console.log(user)

  userData = userData.filter(item => item.uid !== user.uid);

  console.log(userData)
  renderTable();
  modalClose();
}


function createUser() {
  const createInputs = $("input[class='createInputs']");
  const newUser = {};

  for (const input of createInputs) {
    if (input.value.trim() === '') return alert('invalid input');

    if (input.id === 'uid' && !!userData.find(user => user.uid === Number(input.value))) {
      return alert('duplicated user !');
    }

    if (input.id === 'uid') {
      newUser[input.id] = Number(input.value);
      continue;
    }

    newUser[input.id] = input.value;
  }

  userData.push(newUser);
  modalClose();
  renderTable();
}

function renderCreateUser() {
  resetModal();

  modalHeader.text('Create new User');
  let properties = [
    'uid',
    'firstName',
    'lastName',
    'city',
    'personalCode',
    'phoneNumber',
    'position'
  ];

  if (userData.length !== 0) properties = Object.keys(userData[0]);

  modalBody.html(properties.map(property => {
      if (property === 'uid') {
        return `<input type="number" min="0" id="${property}" class="createInputs" value="" placeholder="${property}"/>`;
      }

      return `<input type="text" id="${property}" class="createInputs" value="" placeholder="${property}"/>`;
    })
    .join(''));

  modalFooter.html(`<button class="button addData" onclick="createUser()">save</button>`);

  modalOpen();
}
