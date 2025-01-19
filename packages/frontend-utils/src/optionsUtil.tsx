export const generateOptions = (obj:any)=> Object.values(obj).map((item)=>({
    _id: item,
}))
