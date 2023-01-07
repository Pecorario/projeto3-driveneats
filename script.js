let order = [];
let textOrder;

function handleSelectCard(card, type) {
  const selectedCard = document.querySelector(`.${type}.selected`);

  const formatedValue = Number(
    card.children[3].innerText.replace('R$ ', '').replace(',', '.')
  ).toFixed(2);

  if (selectedCard !== null) {
    selectedCard.children[4].classList.add('hidden');
    selectedCard.classList.remove('selected');

    const typeIndex = order.findIndex(item => item.type === type);

    order[typeIndex] = {
      type: type,
      name: card.children[1].innerText,
      value: formatedValue
    };
  } else {
    order.push({
      type: type,
      name: card.children[1].innerText,
      value: formatedValue
    });
  }

  if (order.length === 3) {
    const button = document.querySelector('.btn');
    button.removeAttribute('disabled');
    button.innerText = 'Fechar pedido';
  }

  card.classList.add('selected');
  card.children[4].classList.remove('hidden');
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
