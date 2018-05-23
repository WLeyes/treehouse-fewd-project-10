// Data Controller
const DataCtrl = ( () => {
  
  // Data Fetch API
  function fetchUserJSON(url,numberOfUsers){  
    fetch(`${url}?seed=b73e4d2e35f01cdc&inc=picture,name,email,location&nat=us&results=${parseInt(numberOfUsers)}`)
      .then(response => response.json())
      .then(data => UICtrl.employees(data))
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
    employees: (data) => {
      console.log(data);

      for(let i = 0; i < data.results.length; i++){
        let image      = data.results[i].picture.medium;
        let firstName  = data.results[i].name.first;
        let lastName   = data.results[i].name.last;
        let email      = data.results[i].email;
        let city       = data.results[i].location.city;
        
        let employee   = `
        <div class="card">
          <img src="${image}" alt="${firstName} ${lastName}'s profile picture" class="img--profile"></img>
          <p>${firstName} ${lastName}</p>
          <a href="mailto:${email}" class="link">${email}</a>
          <p>${city}</p>
        </div>
        `;

        let output = document.createElement('div');
        output.innerHTML = employee;

        document.querySelector('.cards').appendChild(output);

      }

    },

    getSelectors: () => UISelectors
  }
})();



// App Controller
const App = ( (UICtrl, DataCtrl) => {

 // Get UI selectors 
  const UISelectors = UICtrl.getSelectors();
  
  const loadEventListeners = () => {
    // document.querySelector(UISelectors.lineChartHourly).addEventListener("click", ChartCtrl.hourly);
  }

  return {
    init: () => {
      console.log('Initializing App ...');
      DataCtrl.getRandomUser();
      // loadEventListeners();
    }
  }
})(UICtrl, DataCtrl);



// Initialize App
App.init()