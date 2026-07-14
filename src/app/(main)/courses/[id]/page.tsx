import getSingleCourse from "@/lib/api/getSingleCourse";

type Props = {
  params: Promise<{ id: string }>
}

const page = async ({ params }: Props) => {
  // In Next.js 15+, dynamic route params must be awaited
  const { id } = await params;
  const course = await getSingleCourse(id);

  console.log(course);

  return (
    <div>
      
    </div>
  )
}

export default page;
