import Fakerator from "fakerator";

const fakerator = Fakerator();

function generateUsers(numberOfUsers) {
    let users = [];
    const random1000 = Math.floor(Math.random() * 10);
    for (let i = 0; i < numberOfUsers; i++) {
        let user = {
            email: fakerator.internet.email(),
            username: fakerator.names.name(),
            password: fakerator.internet.password(random1000)
        };
        users.push(user);
    }

    return users;
}

const numberOfUsers = 123;
const userData = generateUsers(numberOfUsers);

export { userData, numberOfUsers};