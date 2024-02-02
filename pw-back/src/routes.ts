import paldexRoutes from './actions/paldex.ts';
import playersRoutes from './actions/players.ts';
import levelRoutes from './actions/level.ts';

const routes = {
  "/paldex": paldexRoutes,
  "/players": playersRoutes,
  "/level": levelRoutes,
};

export default routes;