import model from './model';
import utils from '../../lib/utils';

export default class PostRepo {

    constructor() {
        this.model = model;
    }

    create(data) {
        console.log('Expense Repository Create: ', data);
        const id = utils.getObjectId();
        return this.model.create({ ...data, _id: id }).then((res) => res.toObject());
    }

    findById(id) {
        return this.model.findById(id).then((res) => res.toObject());
    }

    list(condition = {}) {
        return this.model.find(condition).lean();
    }

    remove(id) {
        return this.model.findByIdAndRemove(id);
    }

    update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { lean: true });
    }
}