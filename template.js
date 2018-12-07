// just like designing objects except 
//  the user stories are always the same (CRUD)
//  and objects are always stored by ID in the data object


console.log('--- define the data ---');
  
  // build an object literal to model your problem
  //  we provide this
  const example_team_roster = {
    0: {position: '', number: 1, name: 'roger', id: 0},
    1: {position: '', number: 2, name: 'peter', id: 1},
    2: {position: '', number: 3, name: 'orik', id: 2},
  }
  let next_id = 3;

console.log('--- develop manipulations as pure functions ---');

  // code them as pure functions
  //  they write tests & develop the methods


  // create player

  // read_all

  // read_by_id

  // update_by_id

  // delete_by_id


console.log('--- objectify & method-test ---');

  // put it in an oop
  //  get rid of data structure arg
  //  get rid of return values
  //  replace all instances of ds arg with this.structure
  //  write a getter & setter for the data structure
  const oop_roster = {
    roster: {},
    next_id: 0,
    // create player
    // read_all
    // read_by_id
    // update_by_id
    // delete_by_id
  }

  // try hitting fringe cases with your tests

    // all these tests need to change
  const add_player_tests = [
    {it_should: 'add players', actions: [
      {method: 'set_roster', args: [{}], expected: undefined},
      {method: 'add_player', args: [{name: 'i', position: 'i', number: 'i'}], expected: undefined},
      {method: 'get_roster', args: [], expected: {i: {position: 'i', number: 'i'}}}]}
  ]
  test_object(oop_roster, add_player_tests);

  const remove_by_name_tests = [
    {it_should: 'remove player by name', actions: [
      {method: 'set_roster', args: [{}], expected: undefined},
      {method: 'add_player', args: [{name: 'i', position: 'i', number: 'i'}], expected: undefined},
      {method: 'get_roster', args: [], expected: {i: {position: 'i', number: 'i'}}},
      {method: 'remove_player_by_name', args: ['i'], expected: undefined},
      {method: 'get_roster', args: [], expected: {}}]}
  ]
  test_object(oop_roster, remove_by_name_tests);


  const remove_by_number_tests = [
    {it_should: 'remove player by number', actions: [
      {method: 'set_roster', args: [{}], expected: undefined},
      {method: 'add_player', args: [{name: 'i', position: 'i', number: 'i'}], expected: undefined},
      {method: 'get_roster', args: [], expected: {i: {position: 'i', number: 'i'}}},
      {method: 'remove_player_by_number', args: ['i'], expected: undefined},
      {method: 'get_roster', args: [], expected: {}}]}
  ]
  test_object(oop_roster, remove_by_number_tests);


  const update_player_tests = [
    {it_should: 'update player by name', actions: [
      {method: 'set_roster', args: [{i: {position: 'i', number: 'i'}}], expected: undefined},
      {method: 'update_player', args: ['i', {position: 'j', number: 'j'}], expected: undefined},
      {method: 'get_roster', args: [], expected: {i: {position: 'j', number: 'j'}}}]}
  ]
  test_object(oop_roster, update_player_tests);


console.log('--- write a behavioral test suite ---')

/*
  more complex & full use cases that a real person might do
  if you do these right you won't want to name them after a single method
    because they're about a desired final outcome, not any single method
*/










// testing utilities


function test_function(_target, _cases, _log) {
  for (let t_case of _cases) {
    let expected = t_case.expected;

    let actual;
    let msg;
    let log;
    if (_log) {
      log = _target(... t_case.args, true);
      actual = log.result;
    } else {
      actual = _target(... t_case.args, false);
    };

    let pass;
    if (typeof expected === 'object') {
      const _actual = JSON.stringify(actual);
      const _expected = JSON.stringify(expected);
      pass = _actual === _expected;
    } else {
      pass = actual === expected;
    };

    if (!pass && _log) {
      console.log(`    ${t_case.name}: \n` + 
          "actual: ", log, "\n" +
          `expected: {${typeof expected}, ${expected}}`);
    } else if (!pass) {
      console.log(`${t_case.name}: \n` + 
          `   actual: {${typeof actual}, ${actual}} \n` +
          `   expected: {${typeof expected}, ${expected}}`);
    };
  };
};

function test_object(_obj, _tests) {
  let log = [];
  for (let test of _tests) {
    let entry = { it_should: test.it_should };
    let result = run_actions(_obj, test.actions);
    if (result !== true) {
      entry.errors = result
    }
    log.push(entry)
  }
  console.log(log)

  function run_actions(_obj, _cases) {
    let log = {};
    for (let i = 0; i < _cases.length; i++) {

      let result = method_assert(_obj, _cases[i]);
      if (result !== true) {
        log[i+1] = result;
      }

    };
    if (Object.keys(log).length === 0) {
      return true
    } else {
      return log
    }
  };

  function method_assert(_object, _test) {
    let method = _test.method;
    let args = _test.args;
    let expected = _test.expected;

    let actual = _object[method](...args);

    let pass;
    if (typeof expected === 'object') {
      let _actual = JSON.stringify(actual);
      let _expected = JSON.stringify(expected);
      pass = _actual === _expected;
    } else {
      pass = actual === expected;
    };

    if (pass) {
      return true
    } else {
      return { method, actual, expected  }
    };
  };

}


