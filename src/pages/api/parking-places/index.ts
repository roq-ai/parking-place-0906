import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { parkingPlaceValidationSchema } from 'validationSchema/parking-places';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getParkingPlaces();
    case 'POST':
      return createParkingPlace();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getParkingPlaces() {
    const data = await prisma.parking_place
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'parking_place'));
    return res.status(200).json(data);
  }

  async function createParkingPlace() {
    await parkingPlaceValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.parking_place.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
