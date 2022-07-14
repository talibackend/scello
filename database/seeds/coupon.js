module.exports = [
    {
        code : "FIXED10",
        min_price : 50.01,
        fixed_value : 10    
    },
    {
        code : "PERCENT10",
        min_price : 100.01,
        min_items : 2,
        perc_value : 10
    },
    {
        code : "MIXED10",
        min_price : 200.01,
        min_items : 3,
        perc_value : 10,
        fixed_value : 10,
        use_max : true
    },
    {
        code : "REJECTED10",
        min_price : 1000.01,
        perc_value : 10,
        fixed_value : 10
    }
];