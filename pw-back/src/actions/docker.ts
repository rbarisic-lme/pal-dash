import express, { Router, Request, Response } from 'express';

import { execSync } from 'node:child_process';
import { YamlFile } from '@/lib/yamlFile.ts';

interface DockerStatus {
  ID: string,
  CreatedAt: string,
  Image: string,
  Names: string,
  State: string,
  Status: string,
  RunningFor: string,
}

interface ErrorMessage {
  e: string,
}

const router = express.Router();

router.get('/settings', (req: Request, res: Response) => {
  try {
    const jsonResponse = YamlFile.readDockerCompose();
    res.json(jsonResponse);
  } catch(e) {
    console.error(e.message);

    res.status(500);
    res.json({e: e.message 
    })
  }
});

router.get('/status', (req: Request, res: Response): void => {
  try {
    const command = `
      docker ps --format '{
        "ID":"{{ .ID }}",
        "CreatedAt": "{{ .CreatedAt }}",
        "Image": "{{ .Image }}",
        "Names":"{{ .Names }}",
        "State": "{{ .State }}",
        "Status": "{{ .Status }}",
        "RunningFor": "{{ .RunningFor }}"
      }'
    `;
    const output = execSync(command, { shell: 'bash', encoding: 'utf-8', maxBuffer: 1024 * 1024 * 1000  }); //1000mb maxBuffer

    res.json(JSON.parse(output) as DockerStatus|| {});
  } catch (e) {
    console.error(e.message);

    res.status(500);
    res.json({e: e.message as ErrorMessage})
  }
});

export default router;