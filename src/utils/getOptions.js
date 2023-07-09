export const getOptions = (data,fieldValue='location',fieldLabel='label') =>{
    return data.map((item)=>{
        return ({
            label:item[fieldLabel],
            value:item[fieldValue]
        })
    })
}