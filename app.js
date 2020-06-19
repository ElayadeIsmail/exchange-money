const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const swap = document.getElementById("swap");
const rate = document.getElementById("rate");
calculate();

function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((resp) => resp.json())
    .then((data) => {
      const rates = data.rates[currency_two];
      rate.innerText = `${amountEl_one.value} ${currency_one} =${
        +amountEl_one.value * rates
      } ${currency_two} `;
      amountEl_two.value = (+amountEl_one.value * rates).toFixed(2);
    });
}
swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);
