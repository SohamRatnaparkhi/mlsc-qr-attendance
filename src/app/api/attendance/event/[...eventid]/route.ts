import { NextRequest, NextResponse } from "next/server";

const getEventAttendance = async (req: NextRequest) => {
    try {
        const url = req.url as string;
        const eventId = url.split('/').reverse()[0];
        const eventAttendance = await prisma.event.findUnique({
            where: {
                id: Number(eventId),
            },
            include: {
                users: true,
            }
        });
        if (eventAttendance) {
            return NextResponse.json(
                {
                    status: 200,
                    body: eventAttendance,
                }
            )
        }
        return NextResponse.json({
            status: 404,
            body: {
                message: "Error getting event attendance"
            }
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: "Error getting event attendance"
            }
        })
    }
}

type email = string;

const compareAttendance = async (req: NextRequest) => {
    try {
        const url = req.url as string;
        const eventId = url.split('/').reverse()[0];
        const body = await req.json() as {
            expectedAttendees: email[];
        };
        const eventAttendance = await prisma.event.findUnique({
            where: {
                id: Number(eventId),
            },
            include: {
                users: true,
            },
        });
        if (eventAttendance) {
            const attendees = eventAttendance.users.map(user => user.email);
            const attendeesNotPresent = body.expectedAttendees.filter(attendee => !attendees.includes(attendee));
            return NextResponse.json(
                {
                    status: 200,
                    body: {
                        attendeesNotPresent,
                    },
                }
            )
        }
        return NextResponse.json({
            status: 404,
            body: {
                message: "Error getting event attendance"
            }
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: "Error getting event attendance"
            }
        })
    }
}

export {
    getEventAttendance as GET,
    compareAttendance as POST
};
