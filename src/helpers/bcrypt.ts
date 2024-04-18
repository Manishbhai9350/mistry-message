import bcrypt from "bcrypt";


export  async  function hash(item : string){
    return bcrypt.hashSync(item , 10)
}
export  async function verify(item : string  , hashed : string  ){
    return bcrypt.compareSync(item , hashed)
}