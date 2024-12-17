const validInviteCode = 'nurda07-aza06'; // Пример кода приглашения

// Проверка кода приглашения
function checkInviteCode() {
    const inviteCode = document.getElementById('invite-code').value;
    const errorMessage = document.getElementById('error-message');
    
    if (inviteCode === validInviteCode) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'messages.html'; // Перенаправление на страницу сообщений
    } else {
        errorMessage.textContent = 'Неверный код приглашения!';
    }
}

// Проверка, авторизован ли пользователь
function checkLoginStatus() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html'; // Перенаправление на страницу входа
    }
}

// Выход из системы
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html'; // Перенаправление на страницу входа
}

// Функция для отправки сообщения
function sendMessage(event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы (если есть)
    
    const messageInput = document.getElementById('message-input');
    const messageList = document.getElementById('message-list');
    
    if (messageInput.value.trim()) {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.textContent = messageInput.value;
        
        messageList.appendChild(newMessage);
        
        // Не очищаем поле ввода
        saveMessages(); // Сохранение сообщений в localStorage
    }
}

// Функция для сохранения сообщений
function saveMessages() {
    const messages = document.getElementsByClassName('message');
    const messagesArray = [];
    for (let message of messages) {
        messagesArray.push(message.textContent);
    }
    localStorage.setItem('messages', JSON.stringify(messagesArray));
}

// Загрузка сообщений
function loadMessages() {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
        const messagesArray = JSON.parse(savedMessages);
        const messageList = document.getElementById('message-list');
        messagesArray.forEach(msg => {
            const newMessage = document.createElement('div');
            newMessage.classList.add('message');
            newMessage.textContent = msg;
            messageList.appendChild(newMessage);
        });
    }
}

// Загрузка сообщений при загрузке страницы
window.onload = function () {
    checkLoginStatus(); // Проверка, авторизован ли пользователь
    loadMessages(); // Загрузка сообщений
};
