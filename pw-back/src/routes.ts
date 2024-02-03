import paldexRoutes from './actions/paldex.ts';
import playersRoutes from './actions/players.ts';
import levelRoutes from './actions/level.ts';
import dockerRoutes from './actions/docker.ts';

const routes = {
  "/paldex": paldexRoutes,
  "/players": playersRoutes,
  "/level": levelRoutes,
  "/docker": dockerRoutes
};

export default routes;