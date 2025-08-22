const counter = document.getElementById('counter') as HTMLDivElement;
const incrementBtn = document.getElementById('increment') as HTMLButtonElement;
const decrementBtn = document.getElementById('decrement') as HTMLButtonElement;
const resetBtn = document.getElementById('reset') as HTMLButtonElement;

let count = 0;

function updateCounter() {
    if(counter) {
        counter.textContent = count.toString();
    }
}
if(incrementBtn) {
    incrementBtn.addEventListener('click', () => {
        count++;
        updateCounter();
    });
}
if(decrementBtn) {
    decrementBtn.addEventListener('click', () => {
        if (count > 0) {
            count--; 
            updateCounter();
        }
    });
}
if(resetBtn) {
    resetBtn.addEventListener('click', () => {
        count = 0;
        updateCounter();
    });
}