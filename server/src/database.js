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
                reconnectTries: Number.MAX_VALUE,
                useUnifiedTopology: true 
            });
        } catch (error) {
            throw error;
        }
    }
}