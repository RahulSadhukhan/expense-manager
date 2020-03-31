import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

import request from '../../lib/request';
import utils from '../../lib/utils';

const style = () => ({
    root: {
        width: '100%',
        maxWidth: '100ch',
    }
});

class Expense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
        }
    }

    handleEdit = async () => {

    }

    handleDelete = async (id) => {
        try {
            await request.delete(utils.getServerUrl(`/expense/${id}`), { headers: { Authorization: localStorage.getItem('token') } });
            await this.getExpenses();
        } catch (error) {
            console.log(error);
        }
    }

    getExpenses = async () => {
        try {
            const { data } = await request.get(utils.getServerUrl('/expense/list'), { headers: { Authorization: localStorage.getItem('token') } });
            this.setState({ expenses: data });
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getExpenses();
    }

    render() {
        const { expenses } = this.state;
        const { classes } = this.props;
        return (
            <Grid justify="center" container>
                <List className={classes.root}>
                    {expenses.map(expense => (
                        <React.Fragment>
                        <ListItem key={expense._id} alignItems="flex-start">
                            <ListItemText
                                primary={expense.title}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="div"
                                            variant="subtitle2"
                                            display="block"
                                            color="body1"
                                        >
                                            {expense.description}
                                        </Typography>
                                        <Typography
                                            component="div"
                                            variant="caption"
                                            display="block"
                                            color="secondary"
                                        >
                                            {expense.amount}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => this.handleDelete(expense._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider component="li" />
                        </React.Fragment>
                    ))}
                </List>
            </Grid>
        );
    }
}

export default withStyles(style)(Expense);