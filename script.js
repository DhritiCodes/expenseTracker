const list = document.querySelector('.list');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const balance = document.getElementById('balance');
const submitBtn = document.getElementById('submit');
const enteredText = document.getElementById('text');
const enteredAmount = document.getElementById('amount');

// const dummyTransactions = [
//     { id: 1, text: 'Cash', amount: +500 },
//     { id: 2, text: 'Garden', amount: -250 },
//     { id: 3, text: 'Snacks', amount: -50 }
// ];
// let transactions = dummyTransactions;


let transactions = [];

//remove transaction on button click
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)
    addTransactionDOM(transactions);

}

//update DOM with new data 
function updateDOM() {
    const amounts = transactions.map(transaction => transaction.amount)
        //total balance
    const totalBalance = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    //income 
    const totalIncome = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    //expense
    const totalExpense = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    //log to UI
    balance.innerText = `₹${totalBalance}`;
    income.innerText = `₹${totalIncome}`;
    expense.innerText = `₹${totalExpense}`;
}

//add transactions to DOM --INITIALLY
function addTransactionDOM(transaction) {
    list.innerHTML = ' ';

    transaction.forEach(t => {
        //sign
        const sign = t.amount > 0 ? "+" : "-";
        //add to dom by creating li element
        const item = document.createElement('li');
        const plusOrMinus = t.amount > 0 ? 'plus' : 'minus';
        item.classList.add(plusOrMinus);
        item.innerHTML = `
            ${t.text}<span>${sign}${Math.abs(t.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${t.id})">x</button>
        `;
        list.appendChild(item);
    })
    updateDOM(transaction);
}



//generate random id
function getId() {
    return (Math.floor(Math.random() * 100000));
}

//add transaction details
function addTransaction(e) {
    e.preventDefault();
    //get values 
    if (enteredText.value.trim() === "" || enteredAmount.value.trim() === "") {
        alert('please enter valid data');
    } else {
        const transaction = {
            id: getId(),
            text: enteredText.value,
            amount: +enteredAmount.value
        }
        transactions.push(transaction);
        // updateDOM(transaction);

        addTransactionDOM(transactions);
        enteredText.value = "";
        enteredAmount.value = "";

    }

}



//Add transactions individually
form.addEventListener('submit', addTransaction);

//add transactions to DOM
addTransactionDOM(transactions);