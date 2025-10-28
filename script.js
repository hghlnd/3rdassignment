// Load items; migrate old string-only items to {name, location}
let items = JSON.parse(localStorage.getItem('items')) || [];
if (items.length && typeof items[0] === 'string') {
  items = items.map(s => ({ name: s, location: '' }));
  localStorage.setItem('items', JSON.stringify(items));
}

let reminderIntervalId = null;

// Display items on load
document.addEventListener('DOMContentLoaded', displayItems);

// Add item
document.getElementById('addItemButton').addEventListener('click', function () {
  const nameEl = document.getElementById('itemName');
  const locEl = document.getElementById('itemLocation');
  const name = (nameEl.value || '').trim();
  const location = (locEl.value || '').trim();

  if (!name) {
    alert('Please enter an item name.');
    return;
  }

  items.push({ name, location });
  localStorage.setItem('items', JSON.stringify(items));
  displayItems();

  nameEl.value = '';
  locEl.value = '';
});

// Render list
function displayItems() {
  const list = document.getElementById('itemList');
  list.innerHTML = '';

  if (items.length === 0) {
    list.innerHTML = '<li><em>No items yet</em></li>';
    return;
  }

  items.forEach(function (item, index) {
    const li = document.createElement('li');
    const locText = item.location ? ` (${item.location})` : ' (no location)';
    li.textContent = (index + 1) + '. ' + item.name + locText;
    list.appendChild(li);
  });
}

// Reminders
document.getElementById('setReminderButton').addEventListener('click', function () {
  const mins = parseInt(document.getElementById('reminderInterval').value, 10);
  if (isNaN(mins) || mins <= 0) {
    alert('Please enter a valid time interval.');
    return;
  }

  if (reminderIntervalId) clearInterval(reminderIntervalId);

  reminderIntervalId = setInterval(function () {
    if (items.length === 0) {
      alert('Check your pockets!');
      return;
    }

    // Include both names and locations in the reminder
    const listText = items
      .map(i => i.name + (i.location ? ` (${i.location})` : ''))
      .join(', ');

    alert('Check your pockets! Make sure you have: ' + listText);
  }, mins * 60 * 1000);

  alert('Reminder set for every ' + mins + ' minutes.');
});
