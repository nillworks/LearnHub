import CourseDetailsPage from "@/components/CourseDetailsPage/CourseDetailsPage";
import getSingleCourse from "@/lib/api/getSingleCourse";

type Props = {
  params: Promise<{ id: string }>
}

const page = async ({ params }: Props) => {
  // In Next.js 15+, dynamic route params must be awaited
  const { id } = await params;
  const course = await getSingleCourse(id);

  console.log(course);

  if (!course) {
    return <div className="p-20 text-center text-red-500">Course not found</div>;
  }

  return (
    <section>
      <CourseDetailsPage course={course} />
    </section>
  )
}

export default page;
