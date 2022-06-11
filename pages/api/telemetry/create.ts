import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "PUT") {
    try {
      const telemetry: Telemetry = req.body.telemetry
      const response = await prisma.telemetry.upsert({
        where: { uuid: telemetry.uuid },
        update: { uuid: telemetry.uuid, data: telemetry.data },
        create: telemetry,
      })

      res.status(201).json(response)
    } catch (error) {
      res.json(error)
      res.status(405).end()
    }
  }
}
