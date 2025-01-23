function addDataWindow(element) {
    const formHtml = `
        <div class="addingWindow-container">
            <div class="window">
                <button class="close-window" onclick="document.querySelector('.addingWindow-container').remove()">
                    <img src="./icons/close.svg" alt="Close">
                </button>
                <form>
                    ${createFormGroup('inputName', 'Название груза', 'text', 'Введите название груза')}
                    ${createSelectGroup('inputDeparture', 'Пункт отправления', [
                        { value: 'Москва', text: 'Москва', selected: true },
                        { value: 'Санкт-Петербург', text: 'Санкт-Петербург' },
                        { value: 'Казань', text: 'Казань' },
                        { value: 'Екатеринбург', text: 'Екатеринбург' }
                    ])}
                    ${createSelectGroup('inputDestination', 'Пункт назначения', [
                        { value: 'Москва', text: 'Москва' },
                        { value: 'Санкт-Петербург', text: 'Санкт-Петербург', selected: true },
                        { value: 'Казань', text: 'Казань' },
                        { value: 'Екатеринбург', text: 'Екатеринбург' }
                    ])}
                    ${createSelectGroup('inputStatus', 'Начальный статус груза', [
                        { value: 'Ожидает отправки', text: 'Ожидает отправки', selected: true },
                        { value: 'В пути', text: 'В пути' },
                        { value: 'Доставлен', text: 'Доставлен' }
                    ])}
                    ${createDateInput('startDate', 'Дата отправления')}
                    <button type="submit" class="btn btn-primary" disabled>Добавить</button>
                </form>
            </div>
        </div>
    `;

    element.innerHTML += formHtml;

    const form = document.querySelector('form');

    // Элементы формы
    const inputName = form.querySelector("#inputName");
    const startDate = form.querySelector("#startDate");
    const inputStatus = form.querySelector("#inputStatus");
    const buttonSubmit = form.querySelector('button');

    const currentDate = new Date().toISOString().split('T')[0]; // Текущая дата

    // Валидация поля "Название груза"
    inputName.addEventListener('input', () => validateField(inputName));

    // Валидация поля "Дата отправления"
    startDate.addEventListener('input', () => validateField(startDate));

    
    // Обработчик формы

    form.addEventListener('change', () =>{        
        // Валидация полей
        const isNameValid = validateField(inputName);
        const isDateValid = validateField(startDate);
    
        if (!isNameValid || !isDateValid){
            buttonSubmit.disabled = true;
        }
        // Проверка: статус "Доставлен" и дата отправления в будущем
        else if (inputStatus.value === "Доставлен" && startDate.value > currentDate) {
            buttonSubmit.disabled = true;
        }
        else{
            buttonSubmit.disabled = false;
        }

    })

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Если всё в порядке, отправляем данные
        handleSubmit(event);
    });
}

function createFormGroup(id, label, type, placeholder) {
    return `
        <div class="form-group">
            <label for="${id}">${label}</label>
            <input type="${type}" class="form-control" id="${id}" placeholder="${placeholder}">
        </div>
    `;
}

function createSelectGroup(id, label, options) {
    const optionsHtml = options.map(({ value, text, selected }) =>
        `<option value="${value}" ${selected ? 'selected' : ''}>${text}</option>`
    ).join('');

    return `
        <div class="form-group">
            <label for="${id}">${label}</label>
            <select class="form-select form-select-sm" id="${id}">
                ${optionsHtml}
            </select>
        </div>
    `;
}

function createDateInput(id, label) {
    return `
        <div class="form-group">
            <label for="${id}">${label}</label>
            <input id="${id}" class="form-control" type="date" />
        </div>
    `;
}

// Валидация поля
function validateField(input) {
    if (!input.value) {
        input.classList.add('is-invalid');
        return false;
    }
    input.classList.remove('is-invalid');
    return true;
}

function handleSubmit(event) {
    const newData = {
        id: Date.now(),
        name: event.target[0].value,
        status: event.target[3].value,
        origin: event.target[1].value,
        destination: event.target[2].value,
        departureDate: event.target[4].value
    };

    // Добавляем данные в список
    cargoList.push(newData);

    // Обновляем таблицу
    document.querySelector('tbody').innerHTML += `
        <tr>
            <th scope="row">${newData.id}</th>
            <td>${newData.name}</td>
            <td onclick="changeStatus('${newData.id}', '${newData.status}', '${newData.departureDate}')" class="status" style="color: ${
                newData.status === 'В пути' ? '#0000b2' : 
                newData.status === 'Ожидает отправки' ? '#c0b107' : 
                '#be0303'
            }">
                ${newData.status}
            </td>
            <td>${newData.origin} - ${newData.destination}</td>
            <td>${newData.departureDate}</td>
        </tr>
    `;

    // Закрываем окно
    document.querySelector('.addingWindow-container').remove();
}
