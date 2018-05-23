//@flow
import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link, Switch, Route } from 'react-router-dom';
import styled from 'react-emotion';

import logo_src from './logo.png';

/*
https://wpgraphql.com/
https://github.com/wp-graphql/wp-graphql/wiki/Example-Queries
https://playground.wpgraphql.com/#/list-of-posts
https://playground.wpgraphql.com/#/single-post
*/

type PropsType = {|
|};

const query = gql`{
    posts {
      edges {
        node {
          id,
          title,
          date
        }
      }
    }
  }
`;  

const queryItem = gql`
    query post($id: ID!) {
        post(id: $id) {
            id,
            title,
            date,
            content(format:RENDERED)
        }
    }
`;

/*
author {
email
}
*/

const Img = styled('img')`
    width: 200px;
    height: 200px;
`;

const listItem = (itemData: Object) => {
    const { id, title, date } = itemData.node;
    return (
        <div key={id}>
            <Link to={`/details/${id}`}>
                {title} - {date}
            </Link>
        </div>
    );
};

const List = () => (
    <Query query={query} pollInterval={5000}>
        {({ loading, error, data }) => {
            if (loading) {
                return <p>Loading...</p>;
            }
            
            if (error) {
                return <p>Error :(</p>
            };

            return data.posts.edges.map(listItem);
        }}
    </Query>
);

const Detail = (props: {id: string}) => {
    const { id } = props;

    return (
        <React.Fragment>
            <Link to="/">Back</Link>
            <Query query={queryItem} variables={{ id }}  >
                {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error! {error.message}</div>;

                    const { id, title, data: dataPost, content } = data.post;

                    return (
                        <div>
                            <div>{title} - {id}</div>
                            <div dangerouslySetInnerHTML={{__html: content}} />
                        </div>
                    );
                }}
            </Query>
        </React.Fragment>
    );
};

export class App extends React.PureComponent<PropsType> {
    render() {
        return (
            <div>
                <Img src={logo_src} />
                <div>
                    <Switch>
                        <Route exact path='/' component={List} />
                        <Route path="/details/:id" component={(param) => {
                            return (
                                <Detail id={param.match.params.id} />
                            );
                        }} />
                    </Switch>
                </div>
            </div>
        );
    }
}
