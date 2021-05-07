import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import {SearchPage} from './pages/SearchPage'
import {CreateRecipePage} from './pages/CreateRecipePage'
import {AuthPage} from './pages/AuthPage'
import {LoginPage} from './pages/LoginPage'
import {DetailRecipePage} from './pages/DetailRecipePage'
import {UserRecipes} from './pages/UserRecipes'
import {UserRecipeUpdate} from './pages/UserRecipeUpdate'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/search" exact>
          <SearchPage />
        </Route>
        <Route path="/create" exact>
          <CreateRecipePage />
        </Route>
        <Route path="/detail/:id">
          <DetailRecipePage />
        </Route>
        <Route path="/user_recipes/:id" exact>
          <UserRecipes />
        </Route>
        <Route path="/user_recipe/:id/detail/:article_id" exact>
          <UserRecipeUpdate />
        </Route>
        <Redirect to="/"/>
      </Switch>
    )
  }
  
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/search" exact>
        <SearchPage />
      </Route>
      <Route path="/detail/:id">
        <DetailRecipePage />
      </Route>
      <Route path="/auth" exact>
        <AuthPage />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
  
}