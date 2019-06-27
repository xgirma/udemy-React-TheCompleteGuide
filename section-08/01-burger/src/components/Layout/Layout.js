import React, {Fragment} from 'react';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from './../Navigation/SideDrawer/SideDrawer';
import './Layout.css';

const layout = (props) => (
  <Fragment>
    <Toolbar/>
    <SideDrawer/>
    <main className="Content">
      {props.children}
    </main>
  </Fragment>
);

export default layout;
