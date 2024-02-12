// add your new actions to 'routes.ts'
import { PalFiles } from '@/lib/palFiles';
import { LevelFilename, SaveConverter } from '@/lib/saveConverter';
import express, { Router, Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({'routesAvailable': Object.keys(LevelFilename).map(name => name.toLowerCase())} )
})

router.get('/level', async (req: Request, res: Response) => {
  const dataJSON = SaveConverter.savToJSONWorldRoot(LevelFilename.Level);

  res.json(dataJSON);
})
router.get('/levelmeta', async (req: Request, res: Response) => {
  const dataJSON = SaveConverter.savToJSONWorldRoot(LevelFilename.LevelMeta);

  res.json(dataJSON);
})
router.get('/localdata', async (req: Request, res: Response) => {
  const dataJSON = SaveConverter.savToJSONWorldRoot(LevelFilename.LocalData);

  res.json(dataJSON);
})
router.get('/worldoption', async (req: Request, res: Response) => {
  const dataJSON = SaveConverter.savToJSONWorldRoot(LevelFilename.WorldOption);

  res.json(dataJSON);
})

router.get('/', async (req: Request, res: Response) => {
  const playerSaves = await PalFiles.listPlayerSavesWithEnv()

  const testPlayerFilename = playerSaves[0].value
  const playerFileJSON = SaveConverter.playerSavToJSON(testPlayerFilename)

  // console.log(playerFileJSON)

  // const LocalDataJSON = SaveConverter.savToJSONWorldRoot(LevelFilename.LocalData)
  // console.log(LocalDataJSON)

  const levelMetaJSON = SaveConverter.savToJSONWorldRoot(LevelFilename.LevelMeta)
  console.log(levelMetaJSON)

  // const jsonResponse = { message: 'hello world!' };
  res.json("lol");
});

export default router;

// savToJSONWorldRoot