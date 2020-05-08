import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import NotFoundPage from '@pages/NotFound'
import { GlobalStyle } from '@atoms'
import { THEME } from '@constants'

import routes from './routes'

const App: React.SFC = () => (
  <>
    <ThemeProvider theme={THEME.DARK}>
      <GlobalStyle />

      <Switch>
        {routes.map(({ path, exact, component: Component, ...rest }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props: any): React.SFC => <Component {...props} {...rest} />}
          />
        ))}

        <NotFoundPage />
      </Switch>
    </ThemeProvider>
  </>
)

export default App
