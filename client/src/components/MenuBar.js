import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

  import Header from '../components/Header';
  import classes from './MenuBar.module.css';

//NavLink won't send request to server- it will stay local and go to expected route
class MenuBar extends React.Component {
    render() {
        return(
            <Navbar type="light" theme="success" expand="md">
        <NavbarBrand className = "navbar" href="/">CIS 550 Project</NavbarBrand>
       
          <Nav navbar>
         
          <NavItem>
              <NavLink active href="/" className='link-primary'>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/Test"  >
                Test
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/Grow" >
                Grow
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
      
        )
    }
}

export default MenuBar
