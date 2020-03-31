import React from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import request from '../../lib/request';
import utils from '../../lib/utils';

const style = () => ({
    root: {
        width: '100%',
        maxWidth: '100ch',
    }
});

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            date: '',
            amount: '',
        }
    }

    componentDidMount() {

    }

    handleSave = async () => {
        const { amount, title, description } = this.state;
        try {
            await request.post(utils.getServerUrl('/expense'), { amount, title, description }, { headers: { Authorization: localStorage.getItem('token') } });
        } catch (error) {
            console.log(error);   
        }
    }

    render() {
        const { classes } = this.props;
        const { amount, title, description } = this.state;
        return (
            <Grid justify="center" container>
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
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={this.handleSave}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        )
    }
};

export default withStyles(style)(Form);