
# PalDash - Palworld Server Dashboard & Control Panel
<img width="960" alt="image" src="https://github.com/rbarisic-lme/pal-dash/assets/54026388/6acaa932-f551-4c55-8075-65807b4f1e44">

## Setup

There's a build script available in the `./bin` folder of the project root.

#### 1. Build the project
```
chmod a+x ./bin/setup.sh
chmod a+x ./setup.sh
bin/build.sh
```

This starts a semi-interactive installer.
Adjust build.sh and startup.sh in the folders `pw-back` and `pw-front-svelte` according to your environment variables.

It's important to point the environment to the right folders, but since the frontend uses sveltekit, the env variables have to be declared at __runtime__. This is done by running the build.sh, which contains environment variables as argument overloads.

### 2. Install services
```
chmod a+x ./bin/install-services.sh
bin/install-services.sh
```
This will install the backend and frontend as runnable services:
- pw-back
- pw-front

These will run in the background and are manageable via systemd.
#### Service Commands
```
sudo service pw-back [start|stop|status|reload]
sudo service pw-front [start|stop|status|reload]
```
use
- __start__ to start the background services
-  __status__ to get information and see if start has succeeded
-  __stop__ to stop the service
- __reload__ to _stop_ and _start_ again
#### Note

I've tried to make this work as a docker container but there's still some problems with the environment variables

and accessing storage & docker ps command. I'll fix this later on, if I find the time.

## Compatibility

This Control Panel makes a few assumptions about your Setup:

- **Docker** installed and running [jammsen/docker-palworld-dedicated-server](https://github.com/jammsen/docker-palworld-dedicated-server)

- **Python 3** for running [convert.py](https://github.com/cheahjs/palworld-save-tools/), the mvp for palworld data handling

- **node ~> 21** installed (because why not)

You can also just run this inside the provided docker container by running `docker-compose`.

I'm automatically deploying this to my server with a bitbucket pipeline so I can't provide help with this.

## Configuration (Docker config not yet working)

Edit the ENV files in the .docker-compose to change the configuration. This is still WIP so I won't provide a config list just yet.  

## Attributions

- Palsphere Icon shamelessly ripped from the internet, I'll replace this as soon as I get better at illustrator.
- Uses [Palworld-Paldex-API](https://github.com/mlg404/palworld-paldex-api) to grab Images and Informations
- Google [Material Icons](https://fonts.google.com/icons)
- write an issue if I forgot to attribute you. Thanks and love in advance.
