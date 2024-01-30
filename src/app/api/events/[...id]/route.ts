import { NextRequest, NextResponse } from "next/server";

const getEventById = async (req: NextRequest) => {
    try {
        const url = req.url as string;
        const id = url.split("/").reverse()[0];
        const event = await prisma.event.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                users: true,
            }
        })
        if (event) {
            return NextResponse.json(
                {
                    status: 200,
                    body: event,
                }
            )
        }
        return NextResponse.json({
            status: 404,
            body: {
                message: "Error getting event"
            }
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: "Error getting event"
            }
        })
    }
}

export {
    getEventById as GET
};
