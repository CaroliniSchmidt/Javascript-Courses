let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
const cashInput = document.getElementById('cash');
const changeDueDisplay = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const totalPrice = document.getElementById('total-price');
const cashDrawer = document.getElementById('cash-drawer');


const formatResults = (status, change) => {
  changeDueDisplay.innerHTML = `<p>Status: ${status}</p>` + change
  .map(([denominationName, amount]) => `<p>${denominationName}: $${amount.toFixed(2)}</p>`)
  .join('');
};

function checkCashRegister(price, cashInput, cid) {
  const cashInCents = Math.round(Number(cashInput.value) * 100);
  const priceInCents = Math.round(price * 100);
  if (cashInCents < priceInCents) {
    alert('Customer does not have enough money to purchase the item');
    cashInput.value = '';
    return;
  }

  if (cashInCents === priceInCents) {
    changeDueDisplay.innerHTML =
      '<p>No change due - customer paid with exact cash</p>';
    cashInput.value = '';
    return;
  }

  let changeDue = cashInCents - priceInCents;
  const reversedCid = [...cid]
    .reverse()
    .map(([denominationName, amount]) => [
      denominationName,
      Math.round(amount * 100)
    ]);
  const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  const result = { status: 'OPEN', change: [] };
  const totalCID = reversedCid.reduce((prev, [_, amount]) => prev + amount, 0);

  if (totalCID < changeDue) {
    changeDueDisplay.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  if (totalCID === changeDue) {
    result.status = 'CLOSED';
  }

  for (let i = 0; i <= reversedCid.length; i++) {
    if (changeDue >= denominations[i] && changeDue > 0) {
      const [denominationName, total] = reversedCid[i];
      const possibleChange = Math.min(total, changeDue);
      const count = Math.floor(possibleChange / denominations[i]);
      const amountInChange = count * denominations[i];
      changeDue -= amountInChange;

      if (count > 0) {
        result.change.push([denominationName, amountInChange / 100]);
      }
    }
  }
  if (changeDue > 0) {
    changeDueDisplay.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  formatResults(result.status, result.change);
  updateUI(result.change);
};


const checkResults = () => {
  if (!cashInput.value) {
    return;
  }
  checkCashRegister(price, cashInput, cid);
};

const updateUI = change => {
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };
  // Update cid if change is passed in
  if (change) {
    change.forEach(([changeDenomination, changeAmount]) => {
      const targetArr = cid.find(
        ([denominationName]) => denominationName === changeDenomination
      );
      targetArr[1] =
        (Math.round(targetArr[1] * 100) - Math.round(changeAmount * 100)) / 100;
    });
  }

  cashInput.value = '';
  totalPrice.textContent = `Total: $${price}`;
  cashDrawer.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
      .map(
        ([denominationName, amount]) =>
          `<p>${currencyNameMap[denominationName]}: $${amount}</p>`
      )
      .join('')}
  `;
};

purchaseBtn.addEventListener('click', checkResults);

cashInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults();
  }
});

updateUI();