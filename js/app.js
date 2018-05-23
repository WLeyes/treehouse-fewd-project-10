// Data Controller
const DataCtrl = ( () => {
  
  // Data Fetch API
  function fetchUserJSON(url,numberOfUsers){  
    fetch(`${url}?seed=b73e4d2e35f01cdc&nat=us&results=${parseInt(numberOfUsers)}`)
      .then(response => response.json())
      .then(data => UICtrl.card(data))
      .catch(error => console.log(error));
  }

  // public
  return {
    getRandomUser: () => {
      fetchUserJSON('https://randomuser.me/api/',12);
    },
  }
  
})();



// UI Controller
const UICtrl = ( () => {
  const UISelectors = {
    container : '.container',
    cards : '.cards',
  }

  return {
    card: (data) => {
      console.log(data);

      for(let i = 0; i < data.results.length; i++){
        let image      = data.results[i].picture.medium;
        
        let firstName  = data.results[i].name.first;
        let lastName   = data.results[i].name.last;
        let birthday   = data.results[i].dob;
        let email      = data.results[i].email;
        let cell       = data.results[i].cell;

        let street     = data.results[i].location.street;
        let city       = data.results[i].location.city;
        let state      = data.results[i].location.state;
        let postal     = data.results[i].location.postcode;
        
        let next;
        let previous;
        let close;
        let currentEmployee;
        
        let employee   = `
        <div class="card">
          <img src="${image}" alt="${firstName} ${lastName}'s profile picture" class="img--profile"></img>
          <p>${firstName} ${lastName}</p>
          <a href="mailto:${email}" class="link">${email}</a>
          <p>${city}</p>
          <div class="card--details">
            <img src="${image}" alt="${firstName} ${lastName}'s profile picture" class="img--profile"></img>
            <p>${firstName} ${lastName}</p>
            <a href="mailto:${email}" class="link">${email}</a>
            <p>${city}</p>
            <p>${cell}</p>
            <p>${street} ${city}, ${state} ${postal}</p>
            <p>Birthday: ${birthday}</p>
          </div>
        </div>
        `;

        let output = document.createElement('div');
        output.className = 'card--group';
        output.innerHTML = employee;

        document.querySelector('.cards').appendChild(output);
      }
    },
    overlay: () => {

    },
    
    getSelectors: () => UISelectors
  }
})();



// App Controller
const App = ( (UICtrl, DataCtrl) => {

 // Get UI selectors 
  const UISelectors = UICtrl.getSelectors();
  
  const loadEventListeners = () => {

  }

  return {
    init: () => {
      console.log('Initializing App ...');
      DataCtrl.getRandomUser();
      loadEventListeners();
    }
  }
})(UICtrl, DataCtrl);



// Initialize App
App.init()