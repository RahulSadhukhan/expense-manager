import model from './model';
import utils from '../../lib/utils';

export default class UserRepo {

    constructor() {
        this.model = model;
    }

    create(data) {
        const id = utils.getObjectId();
        return this.model.create({ ...data, _id: id }).then((res) => res.toObject());
    }

    findById(id) {
        return this.model.findById(id).then((res) => res.toObject());
    }

    findByEmail(email) {
        return this.model.findOne({ email });
    }
}