import m from 'mithril';
import {NameBox, AgeBox} from './components';

class Root {
  view() {
    return m('div', [NameBox, AgeBox]);
  }
}

export default new Root();
