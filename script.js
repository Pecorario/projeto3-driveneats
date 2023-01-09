const order = [];
let plate = {};
let drink = {};
let dessert = {};
let textOrder;
let nameClient;
let addressClient;

function handleSelectCard(card, type) {
  const selectedCard = document.querySelector(`.${type}.selected`);

  const valueIndex = 3;
  const titleIndex = 1;
  const iconIndex = 4;
  const numberOfItemsExpectedToOrder = 3;

  const formatedValue = Number(
    card.children[valueIndex].innerText.replace('R$ ', '').replace(',', '.')
  ).toFixed(2);

  if (selectedCard !== null) {
    selectedCard.children[iconIndex].classList.add('hidden');
    selectedCard.classList.remove('selected');

    const typeIndex = order.findIndex(item => item.type === type);

    order[typeIndex] = {
      type,
      name: card.children[titleIndex].innerText,
      value: formatedValue
    };
  } else {
    order.push({
      type,
      name: card.children[titleIndex].innerText,
      value: formatedValue
    });
  }

  if (order.length === numberOfItemsExpectedToOrder) {
    const button = document.querySelector('.btn');
    button.removeAttribute('disabled');
    button.innerText = 'Fechar pedido';
  }

  card.classList.add('selected');
  card.children[iconIndex].classList.remove('hidden');
}

function setOrderTypes() {
  plate = order.find(item => item.type === 'plate');
  drink = order.find(item => item.type === 'drink');
  dessert = order.find(item => item.type === 'dessert');
}

function getTotalPrice() {
  return order
    .map(item => item.value)
    .reduce((prev, curr) => Number(prev) + Number(curr), 0);
}

function handleOpenModal() {
  setOrderTypes();

  nameClient = prompt('Qual seu nome?');
  addressClient = prompt('Qual seu endereço?');

  const container = document.querySelector('.container');
  const modal = document.querySelector('.modal');
  const body = document.querySelector('body');

  const divPlate = document.querySelector('.item.plate');
  const divDrink = document.querySelector('.item.drink');
  const divDessert = document.querySelector('.item.dessert');
  const divTotal = document.querySelector('.item.total');

  const indexName = 0;
  const indexValue = 1;

  const totalValue = getTotalPrice();

  divPlate.children[indexName].innerText = plate.name;
  divPlate.children[indexValue].innerText = plate.value
    .toString()
    .replace('.', ',');

  divDrink.children[indexName].innerText = drink.name;
  divDrink.children[indexValue].innerText = drink.value
    .toString()
    .replace('.', ',');

  divDessert.children[indexName].innerText = dessert.name;
  divDessert.children[indexValue].innerText = dessert.value
    .toString()
    .replace('.', ',');

  divTotal.children[indexValue].innerText = `R$ ${totalValue
    .toFixed(2)
    .toString()
    .replace('.', ',')}`;

  container.classList.remove('hidden');
  modal.classList.remove('hidden');
  body.style.overflow = 'hidden';
}

function handleSendOrder() {
  const totalValue = getTotalPrice();

  textOrder = `Olá, gostaria de fazer o pedido:
- Prato: ${plate.name}
- Bebida: ${drink.name}
- Sobremesa: ${dessert.name}
Total: R$ ${totalValue.toFixed(2).toString().replace('.', ',')}

Nome: ${nameClient}
Endereço: ${addressClient}`;

  const encodeOrder = encodeURIComponent(textOrder);

  window.open(`https://wa.me/5543991538824?text=${encodeOrder}`);
}

function handleCloseModal() {
  const container = document.querySelector('.container');
  const modal = document.querySelector('.modal');

  container.classList.add('hidden');
  modal.classList.add('hidden');
}
