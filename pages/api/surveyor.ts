import type { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"
import prisma from "../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await NextCors(req, res, {
    methods: ["GET", "POST", "PATCH", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  })

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
  if (req.method === "PATCH") {
    try {
      const telemetry: Telemetry = req.body.telemetry
      const response = await prisma.telemetry.upsert({
        where: { id: telemetry.id },
        update: {
          id: telemetry.id,
          data: telemetry.data,
          startTime: telemetry.startTime,
          endTime: telemetry.endTime,
        },
        create: telemetry,
      })
      res.status(200).end(res.json(response))
    } catch (error) {
      res.json(error)
      res.status(405).end()
    }
  }
  if (req.method === "DELETE") {
    try {
      const ids: string[] = req.body.telemetries
      const response = await prisma.telemetry.deleteMany({
        where: { id: { in: ids } },
      })
      res.status(200).end(res.json(response))
    } catch (error) {
      res.json(error)
      res.status(405).end()
    }
  }
}
