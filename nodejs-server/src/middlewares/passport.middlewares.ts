import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

import { JWT_SECRET } from '../config/jwtsecret.config';
import User from '../models/user.models';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findOne({where: { idUsuario: payload.idUsuario}});
        if(user) 
            return done(null, user);
        return done(null, false);
    } catch (error) {
        console.log(error)
    }
});