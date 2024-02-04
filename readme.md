# PalDash - Palworld Server Dashboard & Control Panel

## Compatibility

This Control Panel makes a few assumptions about your Setup:
- Docker installed and running [jammsen/docker-palworld-dedicated-server](https://github.com/jammsen/docker-palworld-dedicated-server)
- Python 3 for running [convert.py](https://github.com/cheahjs/palworld-save-tools/), the mvp for palworld data handling
- node > 21 installed (because why not)

You can also just run this inside the provided docker container by running `docker-compose`.
I'm automatically deploying this to my server with a bitbucket pipeline so I can't provide help with this.

## Configuration

Edit the ENV files in the .docker-compose to change the configuration. This is still WIP so I won't provide a config list just yet.

## Attributions

Palsphere Icon shamelessly ripped from [paldex.io](https://paldex.io/palworld/items/pal-sphere/), I'll replace this as soon as I get better at illustrator.