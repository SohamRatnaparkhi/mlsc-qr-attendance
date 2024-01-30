import prisma from "@/prisma/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const addUserToAttendanceOfEvent = async (req: NextRequest) => {
    try {
        const body = await req.json() as User;
        const userAttendance = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                type: body.type,
                eventId: body.eventId,
            }
        });
        if (userAttendance) {
            return NextResponse.json(
                {
                    status: 200,
                    body: userAttendance,
                }
            )
        }
        return NextResponse.json({
            status: 404,
            body: {
                message: "Error adding user to attendance"
            }
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: error
            }
        })
    }
}


export {
    addUserToAttendanceOfEvent as POST
};

