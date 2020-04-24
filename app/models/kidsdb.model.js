module.exports = mongoose => {
    const kidsDB = mongoose.model(
        "kidsDB",
        mongoose.Schema(
            {
                
                name: String,
                chores: String,
                amount: Number
               
            },
            { timestamps: true }
        )
    );
    return kidsDB;
};