var counter = document.getElementById('counter');
var incrementBtn = document.getElementById('increment');
var decrementBtn = document.getElementById('decrement');
var resetBtn = document.getElementById('reset');
var count = 0;
function updateCounter() {
    if (counter) {
        counter.textContent = count.toString();
    }
}
if (incrementBtn) {
    incrementBtn.addEventListener('click', function () {
        count++;
        updateCounter();
    });
}
if (decrementBtn) {
    decrementBtn.addEventListener('click', function () {
        if (count > 0) {
            count--;
            updateCounter();
        }
    });
}
if (resetBtn) {
    resetBtn.addEventListener('click', function () {
        count = 0;
        updateCounter();
    });
}
