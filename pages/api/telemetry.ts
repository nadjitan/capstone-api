import type { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"
import prisma from "../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await NextCors(req, res, {
    methods: ["POST", "PATCH"],
    origin: [
      "http://localhost:6006",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://capstone-demo-site.vercel.app",
    ],
    optionsSuccessStatus: 200,
  })

  if (req.method === "POST") {
    try {
      const telemetry: Telemetry = req.body.telemetry
      const response = await prisma.telemetry.create({
        data: telemetry,
      })
      res.status(200).end(res.json(response))
    } catch (error) {
      res.json(error)
      res.status(405).end()
    }
  }
  if (req.method === "PATCH") {
    try {
      const telemetry: Telemetry = req.body.telemetry
      const response = await prisma.telemetry.update({
        where: { id: telemetry.id },
        data: telemetry,
      })
      res.status(200).end(res.json(response))
    } catch (error) {
      res.json(error)
      res.status(405).end()
    }
  }
}
