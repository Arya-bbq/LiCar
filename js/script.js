// Плавная прокрутка по якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Анимация появления карточек при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.car-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Обработка кнопок "Забронировать" (заглушка)
document.querySelectorAll('.btn-primary-custom').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.textContent.includes('Забронировать')) {
            e.preventDefault();
            alert('Форма бронирования будет доступна после подключения серверной части!');
        }
    });
});

//установка минимальной даты (сегодня) для полей дат
const today = new Date().toISOString().split('T')[0];
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');

if (startDateInput) {
    startDateInput.setAttribute('min', today);
}

if (endDateInput) {
    endDateInput.setAttribute('min', today);
}

//при изменении даты начала обновляется минимальная дата окончания.
if (startDateInput && endDateInput) {
    startDateInput.addEventListener('change', function() {
        endDateInput.setAttribute('min', this.value);
        if (endDateInput.value && endDateInput.value < this.value) {
            endDateInput.value = this.value;
        }
    });
}