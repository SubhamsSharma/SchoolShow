import { SchoolCard } from "@/components/SchoolCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllSchoolsAction } from "@/lib/actions";

export default async function Home() {

    const{data : schools}  = await getAllSchoolsAction()
    //  console.log(schools)

  return (
    <div className="flex flex-col items-center justify-center">
    <Button className="my-5">
      <Link href="/addschool">Add School</Link>
    </Button>
    <div >
   <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-5 justify-center">
    {schools?.map(school => {
      return(
        <li key={school.id}>
          <SchoolCard 
          name={school.name}
          address={school.address}
          city={school.city}
          image={school.image}/>
        </li>
      )
    })}
    </ul>
    </div>
       
       
    </div>
  );
}
