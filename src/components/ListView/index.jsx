import F7SimpleList       from './Lists/Simple';
import F7MediaList        from './Lists/Media';
import F7BaseList         from './Lists/Base';
import F7LinksList        from './Lists/Links';

import F7BaseItem         from './Items/Base';
import F7DividerItem      from './Items/Divider';
import F7ButtonItem       from './Items/Button';
import F7GroupItem        from './Items/Group';

const F7ListView        = F7BaseList;

F7ListView.Simple       = F7SimpleList;
F7ListView.Links        = F7LinksList;
F7ListView.Media        = F7MediaList;

F7ListView.Item         = F7BaseItem;

F7ListView.Group        = F7GroupItem;

F7ListView.Item.Divider = F7DividerItem;
F7ListView.Item.Button  = F7ButtonItem;

export default F7ListView;
