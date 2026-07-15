import CourseDetailsPage from "@/components/CourseDetailsPage/CourseDetailsPage";
import getSingleCourse from "@/lib/api/getSingleCourse";
import getUserSession from "@/lib/getUserSection";
import checkEnrollment from "@/lib/api/checkEnrollment";

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>
}

const page = async ({ params }: Props) => {
  const { id } = await params;
  const course = await getSingleCourse(id);

  if (!course) {
    return <div className="p-20 text-center text-red-500">Course not found</div>;
  }

  let isEnrolled = false;
  const user = await getUserSession();
  if (user) {
    isEnrolled = await checkEnrollment(id);
  }

  return (
    <section>
      <CourseDetailsPage course={course} isEnrolled={isEnrolled} />
    </section>
  )
}

export default page;
