import React from 'react';
import NavBar from '../components/navbar/Navbar';
import Routes from '../routes';

export default class MainLayout extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoggedIn: props.isLoggedIn,
        }
    }

    handleLogout = () => {
        const { history, path } = this.props;
        localStorage.removeItem('token');
        history.push(`${path}/sign-in`);
    }

    render() {
        const { isLoggedIn } = this.state;
        return (
            <div className="main-layout">
                <NavBar handleLogout={this.handleLogout} />
                <div className="main-layout-body">
                    <Routes {...this.props} isLoggedIn={isLoggedIn} />
                </div>
            </div>
        )
    }
}