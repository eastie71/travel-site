var $ = require('jquery');
//var Person = require('./modules/Person');
// ES6 way of importing a module (class here)
import Person from './modules/Person';

class Adult extends Person {
	payTaxes() {
		console.log(this.name + " now owes $0 in taxes!");
	}
}

alert("Test 1 2 3 4 5 6 7 8 9 10!");

var john = new Person("John Doe", "blue");
john.greet();

var jane = new Adult("Jane Smith", "orange");
jane.greet();
jane.payTaxes();

/* $("h1").remove(); */