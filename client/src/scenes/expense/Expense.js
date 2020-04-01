import React, { Component, forwardRef } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';

import request from '../../lib/request';
import utils from '../../lib/utils';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

const style = () => ({
    root: {
        width: '100%',
        maxWidth: '100ch',
        marginTop: 5,
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

    handleDelete = async ({ _id: id }) => {
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
        const { classes, history } = this.props;
        return (
            <Grid justify="center" alignItems="center" container>
                <Grid item className={classes.root}>
                    <MaterialTable
                        icons={tableIcons}
                        title="Expenses"
                        columns={[
                            { title: 'Title', field: 'title', sorting: false },
                            { title: 'Description', field: 'description', sorting: false },
                            { title: 'Amount', field: 'amount' },
                            { title: 'Date', field: 'date' },
                        ]}
                        data={expenses}
                        actions={[
                            {
                                icon: tableIcons.Add,
                                tooltip: 'Add Expense',
                                isFreeAction: true,
                                onClick: () => history.push('/expense-manager/expenses/create')
                            },
                            {
                                icon: tableIcons.Edit,
                                tooltip: 'Edit Expense',
                                onClick: (_, { _id: id }) => history.push(`/expense-manager/expenses/edit/${id}`)
                            },
                            {
                                icon: tableIcons.Delete,
                                tooltip: 'Delete Expense',
                                onClick: (_, rowData) => this.handleDelete(rowData),
                            }
                        ]}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(style)(Expense);