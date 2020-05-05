module.exports = mongoose => {
    const kidsDB = mongoose.model(
        "kidsDB",
        mongoose.Schema(
            {
                
                name: String,
                chores: String,
                amount: Number,
                done: String
               
            },
            { timestamps: true }
        )
    );
    return kidsDB;
};