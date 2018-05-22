//@flow
import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link, Switch, Route } from 'react-router-dom';
import styled from 'react-emotion';

import logo_src from './logo.png';

type PropsType = {|
|};

const query = gql`{
    pokemons(first: 10) {
        id,
        number,
        name
    }
}
`;  

const queryItem = gql`
    query pokemon($id: String!) {
        pokemon(id: $id) {
            id,
            number,
            name,
            image
        }
    }
`;

const Img = styled('img')`
    width: 200px;
    height: 200px;
`;

const listItem = (itemData: Object) => {
    const { id, number, name } = itemData;
    return (
        <div key={id}>
            <Link to={`/details/${id}`}>
                {`${id} - ${number} - ${name}`}
            </Link>
        </div>
    );
};

const List = () => (
    <Query query={query}>
        {({ loading, error, data }) => {
            if (loading) {
                return <p>Loading...</p>;
            }
            
            if (error) {
                return <p>Error :(</p>
            };

            return data.pokemons.map(listItem);
        }}
    </Query>
);

const Detail = (props: {id: string}) => {
    const { id } = props;

    return (
        <React.Fragment>
            <Link to="/">Back</Link>
            <Query query={queryItem} variables={{ id }} /* pollInterval={2000} */ >
                {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error! {error.message}</div>;

                    if (!data.pokemon) {
                        return '404...';
                    }

                    const { id, name, image } = data.pokemon;

                    return (
                        <div>
                            <div>{name} - {id}</div>
                            <div>
                                <img src={image} />
                            </div>
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
