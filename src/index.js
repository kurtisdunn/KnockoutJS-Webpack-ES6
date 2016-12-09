import './scss/main.scss';
import ko from 'knockout';

class PeopleViewModel{
  constructor(){
    //Inital data
    this.people = ko.observableArray([
      { name: 'John Smith', amount: 12.01 },
      { name: 'Jeff Smithe', amount: 0.50 },
      { name: 'Jarrod Smythe', amount: 1.00 }
    ]);

    //Bound remove to the constructor as $parent changes the context of this in ES6 classes.
    this.removePerson = value => { this.people.remove(value); };

  }

  addPerson(){
    //Get Value from text inputs.
    let name = document.getElementsByName('name')[0].value;
    let amount = document.getElementsByName('amount')[0].value;

    if(name !== undefined && amount !== undefined){
      //Add to ko array
      this.people.push({ name: name, amount: amount });
    }

  }

}

ko.applyBindings(new PeopleViewModel());
