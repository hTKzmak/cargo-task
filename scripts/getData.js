const cargoList = [
  {
    id: "CARGO001",
    name: "Строительные материалы",
    status: "В пути",
    origin: "Москва",
    destination: "Казань",
    departureDate: "2024-11-24"
  },
  {
    id: "CARGO002",
    name: "Хрупкий груз",
    status: "Ожидает отправки",
    origin: "Санкт-Петербург",
    destination: "Екатеринбург",
    departureDate: "2024-11-26"
  }
];

function getData(element, filter = null) {
  element.innerHTML = ''; // Очистить текущую таблицу перед добавлением новых строк
  const filteredCargoList = filter ? cargoList.filter(i => i.status === filter) : cargoList;

  filteredCargoList.forEach(i => {
    element.innerHTML += `
      <tr>
        <th scope="row">${i.id}</th>
        <td>${i.name}</td>
        <td onclick="changeStatus('${i.id}', '${i.status}', '${i.departureDate}')" class="status" style="color: ${i.status === 'В пути' ? '#0000b2' : (i.status === 'Ожидает отправки' ? '#c0b107' : '#be0303')}">
          ${i.status}
        </td>
        <td>${i.origin} - ${i.destination}</td>
        <td>${i.departureDate}</td>
      </tr>
    `;
  });
}

function filterData(event) {
  const selectedValue = event.target.value;
  switch (selectedValue) {
    case "В пути":
    case "Ожидает отправки":
    case "Доставлен":
      getData(document.querySelector('tbody'), selectedValue);
      break;
    default:
      getData(document.querySelector('tbody')); // Отображаем все данные
  }
}

// Инициализация данных
getData(document.querySelector('tbody'));