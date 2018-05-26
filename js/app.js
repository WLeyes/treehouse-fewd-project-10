// Data Controller
const DataCtrl = ( () => {
  
  // Data Fetch API
  function fetchUserJSON(url,numberOfUsers){  
    fetch(`${url}?seed=b73e4d2e35f01cdc&nat=us&results=${parseInt(numberOfUsers)}`)
      .then(response => response.json())
      .then(data => {
        UICtrl.card(data);
        UICtrl.autocomplete(data);
      })
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
        let image      = data.results[i].picture.large;
        
        let firstName  = data.results[i].name.first;
        let lastName   = data.results[i].name.last;
        let birthday   = new Date(data.results[i].dob);
        birthday = birthday.toLocaleDateString();
        let email      = data.results[i].email;
        let cell       = data.results[i].cell;
        let username   = data.results[i].login.username;
        let street     = data.results[i].location.street;
        let city       = data.results[i].location.city;
        let state      = data.results[i].location.state;
        let postal     = data.results[i].location.postcode;
        
        let next;
        let previous;
        let close;
        let currentEmployee;
        let formattedBirthday = new Date(birthday);
        let employee   = `
        <div class="card">
          <img src="${image}" alt="${firstName} ${lastName}'s profile picture" class="img--profile"></img>
          <div>
            <h3>${firstName} ${lastName}</h3>
            <a href="mailto:${email}" class="link">${email}</a>
            <p>${city}</p>
            <input type="hidden" value="${username}">
          </div>
          
          <div class="card--details">
            <img src="${image}" alt="${firstName} ${lastName}'s profile picture" class="img--profile"></img>
            <div>
              <h3>${firstName} ${lastName}</h3>
              <a href="mailto:${email}" class="link">${email}</a>
              <p>${city}</p>
            </div>
            <hr>
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
      
      let detailsListener = document.getElementsByClassName('card--details');
      for(let i=0;i<detailsListener.length;i++){
        detailsListener[i].addEventListener('click', () => {
          UICtrl.modal(i);
        });
      }
    },

    modal: (i) =>{
        let container = document.querySelector('.modal');
        let output = document.querySelector('.modal--contents');
        container.style.display = 'block';
        let cards = document.querySelectorAll('.card--group');

        let closeBtn       = `<i class="far fa-times-circle"></i>`
        let nextRecord     = `<i class="fas fa-angle-double-right"></i>`;
        let previousRecord = `<i class="fas fa-angle-double-left"></i>`;
        output.innerHTML   = cards[i].childNodes[1].childNodes[5].innerHTML;
        output.innerHTML   += closeBtn;
        output.innerHTML   += previousRecord;
        output.innerHTML   += nextRecord;

      document.querySelector('.fa-times-circle').addEventListener('click', () =>{
        container.style.display = 'none';
      });

      document.querySelector('.fa-angle-double-right').addEventListener('click', () =>{
          UICtrl.nextRecord(i);
      });

      document.querySelector('.fa-angle-double-left').addEventListener('click', () =>{
        UICtrl.previousRecord(i);
      });
      
    },

    nextRecord: (i) => {
      i++;
      if(i > document.querySelectorAll('.card--group').length - 1){
        i = 0;
      }
      console.log(i);

      let output = document.querySelector('.modal--contents');
      let cards = document.querySelectorAll('.card--group');
      let detailsListener = document.getElementsByClassName('card--details');
      let closeBtn       = `<i class="far fa-times-circle"></i>`
      let nextRecord     = `<i class="fas fa-angle-double-right"></i>`;
      let previousRecord = `<i class="fas fa-angle-double-left"></i>`;  
        output.innerHTML   = cards[i].childNodes[1].childNodes[5].innerHTML;
        output.innerHTML   += closeBtn;
        output.innerHTML   += previousRecord;
        output.innerHTML   += nextRecord;
        UICtrl.modal(i);
    },
    
    previousRecord: (i) => {
      i--;
      console.log(i);
      if(i < 0){
        i = document.querySelectorAll('.card--group').length - 1;
      }
      let output = document.querySelector('.modal--contents');
      let cards = document.querySelectorAll('.card--group');
      let detailsListener = document.getElementsByClassName('card--details');
      let closeBtn       = `<i class="far fa-times-circle"></i>`
      let nextRecord     = `<i class="fas fa-angle-double-right"></i>`;
      let previousRecord = `<i class="fas fa-angle-double-left"></i>`;  
        output.innerHTML   = cards[i].childNodes[1].childNodes[5].innerHTML;
        output.innerHTML   += closeBtn;
        output.innerHTML   += previousRecord;
        output.innerHTML   += nextRecord;
        UICtrl.modal(i);
    },

    autocomplete: (data) => {
      let array= [];
      for(let i = 0; i < data.results.length; i++){
        let firstName = data.results[i].name.first;
        let lastName  = data.results[i].name.last;
        let image     = data.results[i].picture.medium;
        let email     = data.results[i].email;
        let username  = data.results[i].login.username;
        let fullname  = `${firstName} ${lastName}`;
        let datalist  = document.querySelector('#searchList');
        let option    = document.createElement('option');
        option.value  = fullname;
        datalist.appendChild(option);
      }  
     },

     filter: (input) => {
       console.log(input);
       input = document.querySelector('.search');
       let cardGroup = document.querySelectorAll('.card--group');
       let card = document.querySelectorAll('.card');
       inputValue = input.value.toLowerCase();
       console.log(card);
       for(let i = 0; i < cardGroup.length; i++){
         if( card[i].children[1].childNodes[1].innerHTML.indexOf(inputValue) > -1 // By Name
          || card[i].children[1].childNodes[3].innerHTML.indexOf(inputValue) > -1 // By email
          || card[i].children[1].childNodes[7].value.indexOf(inputValue) > -1){   // By username
           cardGroup[i].style.display = '';
         } else {
          cardGroup[i].style.display = 'none';
         }
         input.addEventListener('blur', (e) => {
          input.value = '';
          if(input.value === ''){
            setTimeout( () => cardGroup[i].style.display = '',1000); //allow time for selection before all cards display 
          } else {
            cardGroup[i].style.display = 'none';
          }
        });
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
    document.querySelector('.search').addEventListener('keyup', e => {
      UICtrl.filter(e);
    });
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