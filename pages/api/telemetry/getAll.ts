import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "GET") {
    try {
      const response = await prisma.telemetry.findMany()
      // Parse data property since CockroachDB can only save STRING not JSON
      const parsed = response.map(t => ({ ...t, data: JSON.parse(t.data) }))

      res.json(parsed)
      res.status(200).end()
    } catch (error) {
      res.json(error)
      res.status(405).end()
    }
  }
}
