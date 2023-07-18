import { Request, Response } from "express";
import { logApi } from "../api/log";

class LogController {
  async createLog(req: Request, res: Response) {
    try {
      const log = await logApi.createLog(req.body);
      res.json(log);
    } catch (err) {
      res.status(400).json("ERROR");
    }
  }
  async getLogs(req: Request, res: Response) {
    const logs = await logApi.getLogs();

    res.status(200).json(
      logs.map((log) => {
        return { ...log, key: `${log.id}` };
      })
    );
    return logs;
  }
  async getLogById(req: Request, res: Response) {
    const log = await logApi.getLogById(+req.params.id);

    res.status(200).json(log);
    return log;
  }
}

export default LogController;
