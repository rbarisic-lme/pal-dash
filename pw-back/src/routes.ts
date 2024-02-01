import paldexRoute from './actions/paldex.ts';
import playersRoute from './actions/players.ts';

const routes = {
  "/paldex": paldexRoute,
  "/players": playersRoute,
};

export default routes;