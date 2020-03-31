import React from 'react';
import request from './request';
import utils from './utils';

export default (WrappedComponent) => {
    return class Security extends React.Component {
        constructor(props) {
            super(props);
            this.token = localStorage.getItem('token');
            this.state = {
                username: '',
                isLoading: true,
                loggedIn: false,
            }
        }

        async componentDidMount() {
            const { history } = this.props;
            try {
                const user = await request.get(utils.getServerUrl('/user'), { headers: { Authorization: this.token } })
                this.setState({ username: user.username, isLoading: false, loggedIn: true });
            } catch(error) {
                history.push('/expense-manager/sign-in');
            }
        }

        render() {
            const { isLoading, username, loggedIn } = this.state;
            return (
                    isLoading ? 
                    <p>Loading...</p> :
                    <WrappedComponent {...this.props} token={this.token} username={username} isLoggedIn={loggedIn} />
            )
        }
    };
}