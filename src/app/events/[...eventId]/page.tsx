import { AttendanceForm } from "@/components/custom/AttendanceForm"

const EventAttendanceForm = ({params}: {
    params: {
        eventId: string
    }
}) => {
    const eventId = params.eventId
    return (
        <div>
            {
                eventId
            }
            <AttendanceForm eventId={eventId}/>
        </div>
    )
}

export default EventAttendanceForm
