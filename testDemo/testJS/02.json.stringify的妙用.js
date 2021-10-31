    let list = [
        {
            name:'sjf',
            age:26
        },
        {
            name:'sjf6666',
            age:16
        },
        {
            name:'sjf1231465465465',
            age:22
        },
    ]

    let result1 = JSON.stringify(list)
    console.log(result1)
    // [{"name":"sjf","age":26},{"name":"sjf6666","age":16},{"name":"sjf1231465465465","age":22}]
    let result2 = JSON.stringify(list,['name'])
    console.log(result2)
    // [{"name":"sjf"},{"name":"sjf6666"},{"name":"sjf1231465465465"}]
        let result3 = JSON.stringify(list,['name','age'],2)
        console.log(result3)
        /* 
        [
            {
                "name": "sjf",
                "age": 26
            },
            {
                "name": "sjf6666",
                "age": 16
            },
            {
                "name": "sjf1231465465465",
                "age": 22
            }
            ]
        */
    let result4 = JSON.stringify(list,['name','age'],"*")
    console.log(result4);
    /* 
        [
            *{
            **"name": "sjf",
            **"age": 26
            *},
            *{
            **"name": "sjf6666",
            **"age": 16
            *},
            *{
            **"name": "sjf1231465465465",
            **"age": 22
            *}
`       ]
    
    
    */

    let result5 = JSON.stringify(list,(key,val)=>{
        console.log(key,val)//key 属性键  val属性值
        if(typeof val == "string") return undefined
        return val
    })
    console.log(result5)
    //  [{"age":26},{"age":16},{"age":22}]