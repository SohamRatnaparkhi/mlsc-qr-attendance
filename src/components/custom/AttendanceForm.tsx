"use client"

import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma } from "@prisma/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    eventType: z.enum(["ENTRY", "EXIT"]),
})

export function AttendanceForm({
    eventId,
}: {
    eventId: string
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            eventType: "ENTRY",
        },
    })

    const router = useRouter()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
        const body: Prisma.UserUncheckedCreateInput = {
            email: values.email,
            name: values.username,
            type: values.eventType,
            eventId: Number(eventId),
        }
        const { data } = await axios.post(`${frontendUrl}/api/attendance/participant`, body)
        console.log(data)

    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>MLSC Event Manager</CardTitle>
                <CardDescription>Learn | Build | Empower</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="email"
                            render={( {field}) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john.doe@gmail.com" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your registered email address.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="eventType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Type</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={(value: "ENTRY" | "EXIT") => form.setValue("eventType", value)} {...field}>
                                            <SelectTrigger id="framework">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="ENTRY">Entry</SelectItem>
                                                <SelectItem value="EXIT">Exit</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {/* <Select onValueChange={(value: "ENTRY" | "EXIT") => form.setValue("eventType", value)} {...field}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select"/>
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="ENTRY">Entry</SelectItem>
                                                <SelectItem value="EXIT">Exit</SelectItem>
                                            </SelectContent>
                                        </Select> */}
                                    </FormControl>
                                    <FormDescription>
                                        Choose the event type.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
