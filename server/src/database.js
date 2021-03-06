import mongoose from 'mongoose';

export default class database {
    constructor(url) {
        this.url = url;
    }

    async open() {
        try {
            await mongoose.connect(this.url, {
                useNewUrlParser: true,
                autoIndex: false,
                useFindAndModify: false,
                useUnifiedTopology: true 
            });
        } catch (error) {
            throw error;
        }
    }
}