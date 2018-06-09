import 'framework7/dist/css/framework7.css';
import 'framework7-icons';

import F7ActionSheet  from './components/ActionSheet';
import F7App          from './components/App';
import F7Badge        from './components/Badge';
import F7Block        from './components/Block';
import F7BlockTitle   from './components/BlockTitle';
import F7Button       from './components/Button';
import F7Checkbox     from './components/Checkbox';
import F7Dialog       from './components/Dialog';
import F7Grid         from './components/Grid';
import F7Icon         from './components/Icon';
import F7Inputs       from './components/Inputs';
import F7Link         from './components/Link';
import F7ListView     from './components/ListView';
import F7LoginScreen  from './components/LoginScreen';
import F7Messagebar   from './components/Messagebar';
import F7Navbar       from './components/Navbar';
import F7Page         from './components/Page';
import F7Panel        from './components/Panel';
import F7PhotoBrowser from './components/PhotoBrowser';
import F7Popover      from './components/Popover';
import F7RangeSlider  from './components/RangeSlider';
import F7Tabs         from './components/Tabs';
import F7Toolbar      from './components/Toolbar';
import F7View         from './components/View';
import F7Views        from './components/Views';

class F7React {
  constructor() {
    this.components = {};
  }

  getComponent(name) {
    if (!this.components[name]) {
      console.error(`Try to get undefined F7 React component by name: ${name}`);
      return;
    }

    return this.components[name];
  }
}

F7React.components = {
  ActionSheet : F7ActionSheet,
  App         : F7App,
  Badge       : F7Badge,
  Block       : F7Block,
  BlockTitle  : F7BlockTitle,
  Button      : F7Button,
  Checkbox    : F7Checkbox,
  Dialog      : F7Dialog,
  Grid        : F7Grid,
  Icon        : F7Icon,
  Inputs      : F7Inputs,
  Link        : F7Link,
  ListView    : F7ListView,
  LoginScreen : F7LoginScreen,
  Messagebar  : F7Messagebar,
  Navbar      : F7Navbar,
  Page        : F7Page,
  Panel       : F7Panel,
  PhotoBrowser: F7PhotoBrowser,
  Popover     : F7Popover,
  RangeSlider : F7RangeSlider,
  Tabs        : F7Tabs,
  Toolbar     : F7Toolbar,
  View        : F7View,
  Views       : F7Views,
};

export default new F7React();

export {
  F7ActionSheet  as ActionSheet,
  F7App          as App,
  F7Badge        as Badge,
  F7Block        as Block,
  F7BlockTitle   as BlockTitle,
  F7Button       as Button,
  F7Checkbox     as Checkbox,
  F7Dialog       as Dialog,
  F7Grid         as Grid,
  F7Icon         as Icon,
  F7Inputs       as Inputs,
  F7Link         as Link,
  F7ListView     as ListView,
  F7LoginScreen  as LoginScreen,
  F7Messagebar   as Messagebar,
  F7Navbar       as Navbar,
  F7Page         as Page,
  F7Panel        as Panel,
  F7PhotoBrowser as PhotoBrowser,
  F7Popover      as Popover,
  F7RangeSlider  as RangeSlider,
  F7Tabs         as Tabs,
  F7Toolbar      as Toolbar,
  F7View         as View,
  F7Views        as Views,
};
