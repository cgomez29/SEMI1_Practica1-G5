import User, { UserAttributes } from '../models/user.models';

// for register user
export const verifyCredentialAndUsername = async (
    user: UserAttributes
): Promise<boolean> => {
    const { usuario, contrasena } = user;
    if(!usuario || !contrasena) return false; 

    try {
        // Unique usuario
        const unique = await User.findOne({where: {usuario: usuario}}); 
        console.log(unique)
        if (unique) return false; 
        return true;
    } catch (error) {
        return false;        
    }
}

// for register user
export const verifyCredential = async (
    usuario: string, 
    contrasena: string
): Promise<boolean> => {
    if(!usuario || !contrasena) return false; 
    return true;
}