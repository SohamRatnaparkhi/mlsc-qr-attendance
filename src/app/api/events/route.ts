import prisma from "@/prisma/prisma";
import { Event } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

const addEvent = async (req: NextRequest) => {
    try {
        const body = await req.json() as Event;
        const eventCreated = await prisma.event.create({
            data: {
                name: body.name,
                description: body.description,
                endDateDay: Number(body.endDateDay)!,
                endDateMonth: Number(body.endDateMonth)!,
                endDateYear: Number(body.endDateYear)!,
                startDateDay: Number(body.startDateDay)!,
                startDateMonth: Number(body.startDateMonth)!,
                startDateYear: Number(body.startDateYear)!,
            }
        })
        if (eventCreated) {
            return NextResponse.json(
                {
                    status: 200,
                    body: eventCreated,
                }
            )
        }
        return NextResponse.json({
            status: 404,
            body: {
                message: "Error creating event"
            }
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: "Error creating event"
            }
        })
    }
}

const getEvents = async (req: NextRequest) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                users: true,
            }
        })
        if (events) {
            return NextResponse.json(
                {
                    status: 200,
                    body: events,
                }
            )
        }
        return NextResponse.json({
            status: 404,
            body: {
                message: "Error getting events"
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

const updateEvent = async (req: NextRequest) => {
    try {
        const body = await req.json() as Event;
        const eventUpdated = await prisma.event.update({
            where: {
                id: body.id,
            },
            data: {
                name: body.name,
                description: body.description,
            }
        })
        if (eventUpdated) {
            return NextResponse.json(
                {
                    status: 200,
                    body: eventUpdated,
                }
            )
        }
        return NextResponse.json({
            status: 404,
            body: {
                message: "Error updating event"
            }
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: "Error updating event"
            }
        })
    }
}

const deleteEvent = async (req: NextRequest) => {
    try {
        const body = await req.json() as Event;
        const eventDeleted = await prisma.event.delete({
            where: {
                id: body.id,
            },
        })
        if (eventDeleted) {
            return NextResponse.json(
                {
                    status: 200,
                    body: eventDeleted,
                }
            )
        }
        return NextResponse.json({
            status: 404,
            body: {
                message: "Error deleting event"
            }
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: "Error deleting event"
            }
        })
    }
}

export {
    deleteEvent as DELETE,
    getEvents as GET,
    addEvent as POST,
    updateEvent as PUT
};

