import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

export function SchoolCard({name, address, city, image}){
    return(
    <Card className="w-64 h-64">
  <CardHeader>
    <CardTitle>{name}</CardTitle>
    <CardDescription>{address},{city}</CardDescription>
    {/* <CardAction>Card Action</CardAction> */}
  </CardHeader>
  <CardContent>
    <Image 
    src={image}
    width={520}
    height={360}
    alt={name}
    priority/>
  </CardContent>

</Card>
    )
}