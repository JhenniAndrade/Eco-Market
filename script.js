document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const userList = document.getElementById('user-list');
    const clearFormButton = document.getElementById('clear-form');
    const clearAllButton = document.getElementById('clear-all');
    const searchInput = document.getElementById('search');
    const submitButton = document.querySelector('.admin-button button[type="submit"]');

    const getUsers = () => {
        return JSON.parse(localStorage.getItem('users')) || [];
    };

    const saveUser = (user) => {
        const users = getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    };

    const deleteUser = (index) => {
        const users = getUsers();
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
    };

    const deleteAllUsers = () => {
        localStorage.removeItem('users');
    };

    const renderUsers = (users) => {
        userList.innerHTML = '';
        users.forEach((user, index) => {
            const li = document.createElement('li');
            
            const userInfo = document.createElement('div');
            userInfo.classList.add('user-info');
            userInfo.textContent = `${user.date} - ${user.username} - ${user.email}`;

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                if (confirm(`Tem certeza de que deseja excluir ${user.username}?`)) {
                    deleteUser(index);
                    renderUsers(getUsers());
                }
            });

            li.appendChild(userInfo);
            li.appendChild(deleteButton);
            userList.appendChild(li);
        });
    };

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const newUser = {
            username: usernameInput.value,
            email: emailInput.value,
            date: new Date().toLocaleString()
        };
        saveUser(newUser);
        renderUsers(getUsers());
        userForm.reset();
    });

    clearFormButton.addEventListener('click', () => {
        userForm.reset();
    });

    clearAllButton.addEventListener('click', () => {
        if (confirm('Tem certeza de que deseja excluir todos os usuários?')) {
            deleteAllUsers();
            renderUsers(getUsers());
        }
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredUsers = getUsers().filter(user => 
            user.username.toLowerCase().includes(query) || 
            user.email.toLowerCase().includes(query)
        );
        renderUsers(filteredUsers);
    });

    renderUsers(getUsers());
});
