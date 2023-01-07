let order = [];

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
  }

  order.push({
    type: type,
    name: card.children[1].innerText,
    value: formatedValue
  });

  card.classList.add('selected');
  card.children[4].classList.remove('hidden');
}
