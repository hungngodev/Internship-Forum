import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    // post:[{
    //     type: Schema.Types.ObjectId,
    //     ref:'Internship'
    // }],
    // reviews:[{
    //     type: Schema.Types.ObjectId,
    //     ref:'Review'
    // }]
});

UserSchema.plugin(passportLocalMongoose,{
    
});

export default mongoose.model('User', UserSchema);