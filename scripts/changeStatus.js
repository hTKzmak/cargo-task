function changeStatus(id, status, departureDate) {
    // Создание кастомного окна с выбором статуса
    const formHtml = `
    <div class="window-container">
        <div class="win">
            <button class="close-window" onclick="document.querySelector('.window-container').remove()"><img src="./icons/close.svg" alt="Close"></button>
            <form>
                ${createSelectGroup('inputStatus', 'Начальный статус груза', [
                    { value: 'Ожидает отправки', text: 'Ожидает отправки', selected: true },
                    { value: 'В пути', text: 'В пути' },
                    { value: 'Доставлен', text: 'Доставлен' }
                ])}
                <button type="submit" class="btn btn-primary">Изменить</button>
            </form>
        </div>
    </div>
    `;

    document.body.innerHTML += formHtml;

    const form = document.querySelector('form');
    const inputStatus = form.querySelector("#inputStatus");
    const currentDate = new Date().toISOString().split('T')[0];

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Проверка условий
        if (inputStatus.value === "Доставлен" && departureDate > currentDate) {
            // Показ модального окна
            const modalElement = document.getElementById('warningModal');
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
        } else {
            // Логика изменения статуса
            const index = cargoList.findIndex((elem) => elem.id == id);
            if (index !== -1) {
                cargoList[index].status = inputStatus.value;
            }

            console.log(cargoList);
            getData(document.querySelector('tbody'));
            document.querySelector('.window-container').remove();
        }
    });
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
