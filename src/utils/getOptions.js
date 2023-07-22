export const getOptions = (data,fieldValue='location',fieldLabel='label') =>{
    console.log(data)
    return data.map((item)=>{
        return ({
            label:item[fieldLabel],
            value:item[fieldValue]
        })
    })
}

export const getOptionsUser = (data,fieldValue='userId',fieldLabel='label') =>{
    console.log(data)
    return data.map((item)=>{
        return ({
            label:item[fieldLabel],
            value:item[fieldValue]
        })
    })
}