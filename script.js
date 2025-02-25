document.addEventListener('DOMContentLoaded', () => {
  const billInput = document.querySelector('.input-bill');
  const tipButtons = document.querySelectorAll('.percentages');
  const customTipInput = document.querySelector('.custom');
  const peopleInput = document.querySelector('.input-people');
  const tipAmountDisplay = document.querySelector('.tip-amount-value');
  const totalAmountDisplay = document.querySelector('.total-value');
  const resetButton = document.querySelector('.reset');

  let billValue = 0;
  let tipValue = 0.15;
  let peopleCount = 1;

  function calculateTip() {
    if (peopleCount === 0) return;

    const tipAmount = (billValue * tipValue) / peopleCount;
    const totalAmount = (billValue * (1 + tipValue)) / peopleCount;

    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
  }

  billInput.addEventListener('input', (e) => {
    billValue = parseFloat(e.target.value) || 0;
    calculateTip();
  });

  tipButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      tipButtons.forEach((btn) => btn.classList.remove('active'));
      e.target.classList.add('active');

      tipValue = parseFloat(e.target.textContent) / 100 || 0;
      customTipInput.value = '';
      calculateTip();
    });
  });

  customTipInput.addEventListener('input', (e) => {
    tipButtons.forEach((btn) => btn.classList.remove('active'));
    tipValue = parseFloat(e.target.value) / 100 || 0;
    calculateTip();
  });

  peopleInput.addEventListener('input', (e) => {
    peopleCount = parseInt(e.target.value) || 1;
    calculateTip();
  });

  resetButton.addEventListener('click', () => {
    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '';
    tipButtons.forEach((btn) => btn.classList.remove('active'));
    tipButtons[2].classList.add('active'); // Default to 15%

    billValue = 0;
    tipValue = 0.15;
    peopleCount = 1;

    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
  });

  calculateTip();
});
