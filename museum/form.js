const ticketPrices = {
    'Permanent exhibition': 20,
    'Temporary exhibition': 25,
    'Combined Admission': 40
};

const ticketTypeInputs = document.querySelectorAll('input[name="ticket-check"]');
const minusBtns = document.querySelectorAll('.minus');
const plusBtns = document.querySelectorAll('.plus');
const numberFields = document.querySelectorAll('.number-input__field');
const totalAmount = document.querySelector('.total__amount');

// Функция для получения выбранной цены
function getSelectedTicketPrice() {
    const selectedRadio = document.querySelector('input[name="ticket-check"]:checked');
    const labelText = selectedRadio.nextElementSibling.textContent.trim();
    return ticketPrices[labelText] || 0;
}

// Сохраняем данные в localStorage
function saveData() {
    const selectedType = document.querySelector('input[name="ticket-check"]:checked').nextElementSibling.textContent.trim();
    const basicCount = numberFields[0].value;
    const seniorCount = numberFields[1].value;

    const data = {
        selectedType,
        basicCount,
        seniorCount
    };

    localStorage.setItem('ticketData', JSON.stringify(data));
}

// Загружаем данные из localStorage
function loadData() {
    const data = localStorage.getItem('ticketData');
    if (!data) return;

    const { selectedType, basicCount, seniorCount } = JSON.parse(data);

    // Устанавливаем выбранный тип билета
    ticketTypeInputs.forEach(radio => {
        if (radio.nextElementSibling.textContent.trim() === selectedType) {
            radio.checked = true;
        }
    });

    // Устанавливаем количество билетов
    numberFields[0].value = basicCount;
    numberFields[1].value = seniorCount;
}

// Функция пересчёта суммы
function calculateTotal() {
    const price = getSelectedTicketPrice();
    const basicCount = parseInt(numberFields[0].value) || 0;
    const seniorCount = parseInt(numberFields[1].value) || 0;

    const total = (basicCount * price) + (seniorCount * (price / 2));
    totalAmount.textContent = total.toFixed(2);

    saveData();
}

// Обработчики кнопок минус
minusBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        let currentValue = parseInt(numberFields[index].value) || 0;
        if (currentValue > 0) {
            numberFields[index].value = currentValue - 1;
            calculateTotal();
        }
    });
});

// Обработчики кнопок плюс
plusBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        let currentValue = parseInt(numberFields[index].value) || 0;
        numberFields[index].value = currentValue + 1;
        calculateTotal();
    });
});

// Обновляем при смене типа билета
ticketTypeInputs.forEach(radio => {
    radio.addEventListener('change', calculateTotal);
});

// При загрузке страницы восстанавливаем данные
window.addEventListener('DOMContentLoaded', () => {
    loadData();
    calculateTotal();
});
