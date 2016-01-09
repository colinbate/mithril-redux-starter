import m from 'mithril';
import {connect} from 'mithril-redux';
import {incrementAge, decrementAge, resetAge} from './actions';

class _NameBox {
  view(ctrl, {name}) {
    return m('div', 'Hello ' + name);
  }
}

class _AgeBox {
  view(ctrl, {age}) {
    return m('div', [
        m('span', 'Age: ' + age),
        m('button', {onclick: ctrl.dec()}, 'Younger'),
        m('button', {onclick: ctrl.inc()}, 'Older'),
        m('button', {onclick: ctrl.reset()}, 'Reset')
    ]);
  }
}


export const NameBox = connect((state) => ({name: state.name}))(_NameBox);

export const AgeBox = connect((state) => ({age: state.age}), {
  inc: incrementAge,
  dec: decrementAge,
  reset: resetAge
})(_AgeBox);

