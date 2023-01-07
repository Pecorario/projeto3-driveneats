const order = [];
let textOrder;
const valueIndex = 3;
const titleIndex = 1;
const iconIndex = 4;
const numberOfItemsExpectedToOrder = 3;

function handleSelectCard(card, type) {
  const selectedCard = document.querySelector(`.${type}.selected`);

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

function handleSendOrder() {
  const plate = order.find(item => item.type === 'plate');
  const drink = order.find(item => item.type === 'drink');
  const dessert = order.find(item => item.type === 'dessert');

  const totalValue = order
    .map(item => item.value)
    .reduce((prev, curr) => Number(prev) + Number(curr), 0);

  textOrder = `Olá, gostaria de fazer o pedido:
- Prato: ${plate.name}
- Bebida: ${drink.name}
- Sobremesa: ${dessert.name}
Total: R$ ${totalValue.toFixed(2)}`;

  const encodeOrder = encodeURIComponent(textOrder);

  window.open(`https://wa.me/5511911111111?text=${encodeOrder}`);
}
