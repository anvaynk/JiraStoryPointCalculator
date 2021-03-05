const callback = function(mutationsList, observer) {
  const pool = document.getElementById('ghx-pool');
  let headers = Array.from(pool.querySelectorAll('#ghx-column-headers .ghx-column'));
  let body = Array.from(pool.querySelectorAll('.ghx-columns .ghx-column'));
  body.forEach((column, index) => {
    const tickets = Array.from(column.querySelectorAll('.ghx-estimate'));
    const total = tickets.reduce((acc, elem) => {
      if(!isNaN(elem.innerHTML)){
        return acc + parseInt(elem.innerHTML);
      }
      return acc;
    }, 0);
    const header = headers[index].querySelector('.ghx-column-header-flex');
    header.style["justify-content"] = "space-between";
    let node = header.getElementsByClassName('sp-total')[0];
    debugger;
    if(node){
      const h2 = node.getElementsByTagName('h2')[0];
      h2.innerHTML = total;
    } else {
      node = document.createElement('div');
      node.classList.add('sp-total');
      const h2 = document.createElement('h2');
      h2.innerHTML = total;
      node.appendChild(h2);
      header.appendChild(node);  
    }
  })
};

//Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);
const instantiateListener = () => {
  //const column = document.getElementsByClassName('ghx-columns')[0];
  const pool = document.getElementById('ghx-pool');
  if(pool){
    observer.observe(pool, { childList: true, subtree: false, attributes: false });
    callback();
  }

}
window.addEventListener('load', instantiateListener, false);

window.addEventListener('unload', () => {
  observer.disconnect();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action } = message;
  switch(action) {
    case "calculate_aggregates":
    instantiateListener();
    break;
    default: 
    break;
  }
  return true
});