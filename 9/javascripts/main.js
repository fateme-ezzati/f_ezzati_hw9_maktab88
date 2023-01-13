$(document).ready(function () {

  const users = [...userData];

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
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
          <td>${user.city}</td>
          <td>${user.postalCode}</td>
          <td>${user.phoneNumber}</td>
          <td>${user.position}</td>
        </tr>`;
  }

  tbody.html(`${tableBody}`)

});

function renderReadUser(uid) {
  // resetModal();

  const user = userData.find(user => user.uid === uid);

  modalHeader.textContent = 'User info';

  modalBody.innerHTML = Object.keys(user)
    .map(property => `<p><strong>${property}:</strong> ${user[property]}</p>`)
    .join('');

  modalFooter.innerHTML = `
    <button class="button" onclick="renderUpdateUser(${uid})">update</button>
    <button class="button" onclick="deleteUser(${uid})">delete</button>`;

  // modalOpen();

}