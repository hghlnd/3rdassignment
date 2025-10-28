let items = JSON.parse(localStorage.getItem('items')) || [];
let reminderIntervalId = null;

// Display items when the page loads
document.addEventListener('DOMContentLoaded', displayItems);

// Add a new item
document.getElementById('addItemButton').addEventListener('click', function() {
  let itemInput = document.getElementById('itemInput');
  let itemName = itemInput.value.trim();

  if (itemName !== "") {
    items.push(itemName);
    localStorage.setItem('items', JSON.stringify(items));
    displayItems();
    itemInput.value = "";
  } else {
    alert('Please enter an item name');
  }
});

// Display all saved items
function displayItems() {
  let itemList = document.getElementById('itemList');
  itemList.innerHTML = '';

  if (items.length === 0) {
    itemList.innerHTML = '<li><em>No items yet</em></li>';
    return;
  }

  items.forEach(function(item, index) {
    let listItem = document.createElement('li');
    listItem.textContent = (index + 1) + ". " + item;
    itemList.appendChild(listItem);
  });
}

// Set reminder interval
document.getElementById('setReminderButton').addEventListener('click', function() {
  let intervalInput = document.getElementById('reminderInterval').value;
  let interval = parseInt(intervalInput) * 60 * 1000;

  if (interval > 0) {
    if (reminderIntervalId) clearInterval(reminderIntervalId);
    reminderIntervalId = setInterval(function() {
      alert('Check your pockets! Make sure you have your: ' + items.join(', '));
    }, interval);
    alert('Reminder set for every ' + intervalInput + ' minutes.');
  } else {
    alert('Please enter a valid time interval.');
  }
});
