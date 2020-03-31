import mongoose from 'mongoose';

class Utils {
    getObjectId() {
        return String(mongoose.Types.ObjectId());
    }
}

export default new Utils();