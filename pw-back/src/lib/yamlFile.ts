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
  
  static read(filePath: string) {
    // todo: implement 
  }

  static readDockerCompose(): JSON {
    const file = fs.readFileSync(path.join(env.rootDir, 'docker-compose.yml'), 'utf8')
    const fileYaml = YAML.parse(file)

    return YamlFile.sanitizeDockerCompose(fileYaml);

    // const saneFile = fileYaml.filter(line => {
    //   console.error('lINAA', line)
    //   return line
    // })
  }
}