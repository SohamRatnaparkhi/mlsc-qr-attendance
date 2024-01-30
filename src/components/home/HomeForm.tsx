import { Event } from '@prisma/client'
import axios from 'axios'
import { CardWithForm } from '../custom/CardWithForm'

const HomeForm = async () => {
    const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
    const { data } = await axios.get(`${frontendUrl}/api/events`)
    const body = data.body as Event[]
    const events = body.map((event) => ({
        label: event.name,
        value: String(event.id),
    }))
    return (
        <div>
            <CardWithForm options={events} />
        </div>
    )
}

export default HomeForm
