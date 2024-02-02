"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React from "react";

export function CardWithForm({
    options,
}: {
    options: { label: string; value: string }[]
}) {
    const [selected, setSelected] = React.useState(options[0].value)
    const router = useRouter()
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>MLSC Event Manager</CardTitle>
                <CardDescription>Learn | Build | Empower</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Select Event</Label>
                            <Select onValueChange={(value) => setSelected(value)}>
                                <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {
                                        options.map((option) => (
                                            <div key={option.value} >
                                                <SelectItem value={option.value} >                                                    
                                                        {option.label}
                                                </SelectItem>
                                            </div>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <div>
                    <Button
                        onClick={
                            () => {
                                router.push(`/events/${selected}`)
                            }
                        }
                    >Proceed</Button>
                </div>
            </CardFooter>
        </Card>
    )
}
