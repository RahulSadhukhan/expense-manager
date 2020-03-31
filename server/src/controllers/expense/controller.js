import ExpenseRepository from '../../repositories/expense/repository';

class UserController {
    constructor() {
        this.expenseRepository = new ExpenseRepository();
        this.create = this.create.bind(this);
        this.list = this.list.bind(this);
        this.find = this.find.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(req, res) {
        const { body: data, claims: { id } } = req;
        const expense = await this.expenseRepository.create({
            userId: id,
            ...data,
        });
        res.status(200).json(expense);
    }
    
    async list(req, res) {
        const { claims: { id: userId } } = req;
        const expenses = await this.expenseRepository.list({ userId });
        res.status(200).json(expenses);
    }

    async find(req, res) {
        const { params: { id }, claims: { id: userId } } = req;
        const expense = await this.expenseRepository.findById(id);
        if (expense.userId !== userId) {
            res.status(400).send('You are not authorized to view this expense!');
        } else {
            res.status(200).json(expense);
        }
    }

    async update(req, res) {
        const { params: { id }, claims: { id: userId }, body: data } = req;
        const expense = await this.expenseRepository.findById(id);
        if (!expense) {
            res.status(404).send('Expense does not exist!');
        }
        if (expense.userId !== userId) {
            res.status(400).send('You are not authorized to update the expense!');
        } else {
            const updatedExpense = await this.expenseRepository.update(id, data);
            res.status(200).send(updatedExpense);
        }
    }

    async delete(req, res) {
        const { params: { id }, claims: { id: userId } } = req;
        const post = await this.expenseRepository.findById(id);
        if (post.userId !== userId) {
            res.status(400).send('You are not authorized to delete the expense!');
        } else {
            await this.expenseRepository.remove(id);
            res.status(200).send('Successfully deleted the expense!');
        }
    }
}

export default new UserController();