//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App/App';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { hydrate } from 'emotion'

import { withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root');

if (root) {
    const data_init_string = root.getAttribute('data-init');
    const data_ids_string = root.getAttribute('data-ids');

    if (data_init_string && data_ids_string) {
        const data_init = JSON.parse(data_init_string);
        const data_ids = JSON.parse(data_ids_string);

        hydrate(data_ids);

        const client = new ApolloClient({
            //link: createHttpLink({ uri: "https://api.wpgraphql.com/graphql" }),
            link: createHttpLink({ uri: 'http://2upwp.porubis.pl/graphql' }),
            cache: new InMemoryCache().restore(data_init)
        });

        /*
        https://github.com/ReactTraining/react-router/issues/6072
            https://codesandbox.io/s/rjl08qoxlp

        https://github.com/ReactTraining/react-router/issues/5901
        https://github.com/ReactTraining/react-router/pull/5908

        aktualizacja:
        w wersji 16.4 problem nie powinien występować:
        https://github.com/ReactTraining/react-router/issues/6072#issuecomment-391557336
        https://reactjs.org/blog/2018/05/23/react-v-16-4.html
        lecz nadal występuje
        */

        const AppWithRouter = withRouter(App);

        ReactDOM.render((
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <AppWithRouter />
                </BrowserRouter>
            </ApolloProvider>
        ), root);
    } else {
        console.error('App startup: #root.data-init or #root.data-ids attribute not found');
    }
} else {
    console.error('App startup: #root element not found');
}

