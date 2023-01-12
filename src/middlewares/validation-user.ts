import {User} from '../entities/index'

export const validateUserName = async(name:string) => {
    const user = await User.findOneBy({name})

    if(user){
        throw new Error('El nombre de usuario ya existe')
    }
} 