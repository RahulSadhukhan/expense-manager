import React from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router";

import request from '../../lib/request';
import utils from '../../lib/utils';

const style = () => ({
    root: {
        width: '100%',
        maxWidth: '100ch',
    },
    h6: {
        width: '100%',
        maxWidth: '100ch',
        marginTop: 5,
    },
    button: {
        marginLeft: 5,
    }
});

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            date: new Date(),
            amount: ''
        }
    }

    async componentDidMount() {
        const { edit } = this.props;
        if (edit) {
            const { match: { params: { id } } } = this.props;
            try {
                const expense = await request.get(utils.getServerUrl(`/expense/${id}`), { headers: { Authorization: localStorage.getItem('token') } });
                const { data: { title, description, amount, date } } = expense;
                this.setState({ title, description, amount, date });
            } catch (error) {
                console.log('error', error);
            }
        }
    }

    handleSave = async () => {
        const { amount, title, description } = this.state;
        const { history, edit } = this.props;
        if (edit) {
            const { match: { params: { id } } } = this.props;
            try {
                await request.put(utils.getServerUrl(`/expense/${id}`), { amount, title, description }, { headers: { Authorization: localStorage.getItem('token') } });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await request.post(utils.getServerUrl('/expense'), { amount, title, description }, { headers: { Authorization: localStorage.getItem('token') } });
            } catch (error) {
                console.log(error);
            }
        }
        history.push('/expense-manager/expenses');
    }

    render() {
        const { classes, edit, history } = this.props;
        const { amount, title, description } = this.state;
        return (
            <Grid justify="center" container>
                <Grid item className={classes.h6}>
                    <Typography align="center" variant="h6">
                        {
                            edit ? "Edit Expense" : "Add Expense"
                        }
                    </Typography>
                </Grid>
                <Grid item className={classes.root}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="standard-full-width"
                        label="Title"
                        value={title}
                        onChange={(event) => this.setState({ title: event.target.value })}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Description"
                        fullWidth
                        margin="normal"
                        value={description}
                        onChange={(event) => this.setState({ description: event.target.value })}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Amount"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={amount}
                        onChange={(event) => this.setState({ amount: event.target.value })}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={this.handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        onClick={() => history.push('/expense-manager/expenses')}
                    >
                        cancel
                    </Button>
                </Grid>
            </Grid>
        )
    }
};

export default withRouter(withStyles(style)(Form));