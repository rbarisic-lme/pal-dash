import paldexRoutes from './actions/paldex.ts';
import playersRoutes from './actions/players.ts';
import levelRoutes from './actions/level.ts';
import dockerRoutes from './actions/docker.ts';
import sessionRoutes from './actions/session.ts';
import rconRoutes from './actions/rcon.ts';

const routes = {
  "/paldex": paldexRoutes,
  "/players": playersRoutes,
  "/level": levelRoutes,
  "/docker": dockerRoutes,
  "/session": sessionRoutes,
  "/rcon": rconRoutes,
};

export default routes;