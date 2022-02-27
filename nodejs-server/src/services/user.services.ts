import User, { UserAttributes } from '../models/user.models';

// for register user
export const verifyCredentialAndUsername = async (user: UserAttributes) => {
    const { username, password } = user;
    if(!username || !password) return false; 

    try {
        // Unique username
        const unique = await User.findOne({where: {username: username}}); 
        if (unique) return false; 
        return true;
    } catch (error) {
        return false;        
    }
}

// for register user
export const verifyCredential = async (username: string, password: string): Promise<boolean> => {
    if(!username || !password) return false; 
    return true;
}