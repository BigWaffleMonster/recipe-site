/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react'
import { Form, FormControl, Navbar, NavLink, Nav, Button, Container} from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import Switch from 'react-bootstrap/esm/Switch'
import logo from './assets/logo1.png'
import { BrowserRouter as Router, Route} from "react-router-dom";
import SearchRecipe from '../Pages/search';
import Home from '../Pages/home';

export default class Header extends Component {
    render() {
        return (
            <>

            <Container>
                <Navbar.Brand href="/">
                    <img
                            src={logo}
                            heigth="500"
                            width="250"
                            className="d-inline-block align-top" 
                            alt="Logo"
                        />
                    </Navbar.Brand>
            </Container>

            <Navbar collapseOnSelect expand="md" bg="success" variant = "dark">
                <Container>
                    <NavbarToggle aria-controls="responsive-navbar-nav"/>

                    <NavbarCollapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">                        
                            <NavLink href="/search"> Поиск рецептов </NavLink>
                            <NavLink href="/home"> Главная </NavLink>
                        </Nav>
                        <Form inline>
                            <FormControl 
                            type="text" 
                            placeholder="Поиск" 
                            className="mr-sm-2">
                            </FormControl>
                            <Button variant="success">Поиск</Button>
                        </Form>
                    </NavbarCollapse>
                </Container>
            </Navbar>

            <Router>
                <Switch>
                    <Route exact path = "/search" component = {SearchRecipe}/>
                    <Route exact path = "/home" component = {Home}/>
                </Switch>
            </Router>

            </>
        );
    }
}
