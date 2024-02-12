import YAML from 'yaml'
import path from 'path';
import fs from 'fs';
import { env } from '@/config.ts';

export class YamlFile {
  static sanitizeDockerCompose = (config) => {
    Object.keys(config.services).forEach(key => {
      const service = config.services[key];
  
      ['ADMIN_PASSWORD', 'SERVER_PASSWORD', 'RCON_PORT'].forEach(keyword => {
        // Find the index of the 'ADMIN_PASSWORD' environment variable
        const forbiddenIndex = service.environment.findIndex(key => key.includes(keyword));
    
        if (forbiddenIndex !== -1) {
          // If 'ADMIN_PASSWORD' environment variable is found, replace its value
          service.environment[forbiddenIndex] = `${keyword}=<REDACTED>`;
        }
      })

      service.environment = Object.fromEntries(service.environment.map(i => i.split('=')));
    });
  
    return config;
  };

  static convertEnvToDockerComposeBlock(fileContent: string) {
    // Split the content into lines
    const lines = fileContent.split('\n');

    // Prepend each line with " - "
    const modifiedContent = lines
      .filter(line => line && !line.trim().startsWith('#'))
      .map(line => ` - ${line}`).join('\n');

    return modifiedContent;
  }

  static read(filePath: string) {
    // todo: implement 
  }

  static readDockerCompose() {
    const filenames = ['docker-compose.yml'];

    for (const filename of filenames) {
      try {
        const file = fs.readFileSync(path.join(env.rootDir, filename), 'utf8')
        
        const fileYaml = YAML.parse(file)

        const serverConfig = fileYaml?.services?.['palworld-dedicated-server']

        // Handle newer jammsen/docker releases where the environment is not part of the docker-compose.yml
        if(serverConfig['env_file']) {

          for (const envFilename of serverConfig['env_file']) {
            try {
              const envFile = YamlFile.convertEnvToDockerComposeBlock(fs.readFileSync(path.join(env.rootDir, envFilename), 'utf8'))
              const envFileYaml = YAML.parse(envFile);

              serverConfig.environment = envFileYaml;
            } catch (e) {
              console.warn(`Error reading .env config in ${envFilename}, : ${e.message}, skipping to next entry`);
            }
          }
        }

        console.info(`[${new Date().toLocaleString()}] Read env file yaml`)
        return YamlFile.sanitizeDockerCompose(fileYaml);
      } catch(e) {
        console.warn(`Error reading docker-compose config in ${filename}, : ${e.message}, skipping to next entry`);
      }
    }

    console.error(`Failed to read any .env config file, returning null.`);
    return null;
  }
}