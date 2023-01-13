const usersListContainer = document.getElementById('usersList');
const userProfileModalTitle = document.getElementById('userProfileModalTitle');
const userProfileModalBody = document.getElementById('userProfileModalBody');
const userProfileModalFooter = document.getElementById('userProfileModalFooter');

let selectedUser = null;

const generateProfileInformation = ({uid, city, postalCode, phoneNumber, position}, collapse = true) => {
    return `
    <ul class="list-group list-group-flush my-4">
        ${collapse ? '' : `<li class="list-group-item">uid: ${uid}</li>`}
        <li class="list-group-item">position: ${position}</li>
        <li class="list-group-item">city: ${city}</li>
        ${collapse ? '' : `
        <li class="list-group-item">postalCode: ${postalCode}</li>
        <li class="list-group-item">phoneNumber: ${phoneNumber}</li>
        `}
    </ul>
    `
}

const showModalInformation = ({firstname, lastname, ...params}) => {
    const title = `${firstname} ${lastname}`;
    userProfileModalTitle.innerText = title;

    const profileInfo = generateProfileInformation(params, false);
    userProfileModalBody.innerHTML = profileInfo;
}

const handleOnClickProfileBtn = (uid) => {
    const targetUser = userData.find(el => el.uid === uid);
    selectedUser = targetUser;
    showModalInformation(targetUser);
}
const cardGenerator = ({uid, firstname, lastname, avatar, city, position}) => {
    return `
        <div class="col-3">
            <div class="card shadow rounded-4">
                <img src="${avatar}" class="card-img-top p-2 rounded-4" alt="${uid}">
                <div class="card-body">
                    <h5 class="card-title text-center">${firstname} ${lastname}</h5>
                    ${generateProfileInformation({city, position})}
                    <button
                        onclick="handleOnClickProfileBtn(${uid})" 
                        class="btn btn-primary rounded-3 w-100"
                        data-bs-toggle="modal" data-bs-target="#userProfileModal"
                    >
                        Profile
                    </button>
                </div>
            </div>
        </div>
    `
}

const usersListGenerator = () => {
    let usersListBody = '';
    for (const user of userData) {
        usersListBody += cardGenerator(user);
    }
    return usersListBody;
}

const renderUsersList = () => {
    usersListContainer.innerHTML = usersListGenerator();
}
renderUsersList();