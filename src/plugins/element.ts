import Vue from 'vue'
import 'element-ui/lib/theme-chalk/display.css';
// import 'element-ui/lib/theme-chalk/index.css';
import { message } from './resetMessage'
import {
    Avatar,
    Steps,
    Step,
    Tabs,
    TabPane,
    Cascader,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Table,
    TableColumn,
    Pagination,
    Breadcrumb,
    BreadcrumbItem,
    Divider,
    Popover,
    Image,
    DatePicker,
    TimePicker,
    Checkbox,
    CheckboxGroup,
    Switch,
    Input,
    FormItem,
    Form,
    Radio,
    RadioGroup,
    Tree,
    Select,
    Option,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Button,
    Loading,
    MessageBox,
    // Message,
    Notification,
    Row,
    Col,
    ColorPicker,
    Upload,
    Dialog, Tooltip,
    Collapse, CollapseItem,
    Drawer,
    Autocomplete,
    // @ts-ignore
    Scrollbar,
		Alert,
    Progress,
    Popconfirm
} from 'element-ui';
// @ts-ignore
import VuePreview from 'vue-preview';
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.5,
    tapToClose: true,
    tapToToggleControls: false
});
Vue.use(Popconfirm);
Vue.use(Avatar);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Cascader);
Vue.use(Divider);
Vue.use(Popover);
Vue.use(Image);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(RadioGroup);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Radio);
Vue.use(Form);
Vue.use(Tree);
Vue.use(ColorPicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Button);
Vue.use(Loading.directive);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Tooltip);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Drawer);
Vue.use(Autocomplete);
Vue.use(Scrollbar);
Vue.use(Alert);
Vue.use(Progress);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = message;
