import CourseDetailsPage from "@/components/CourseDetailsPage/CourseDetailsPage";
import getSingleCourse from "@/lib/api/getSingleCourse";
import getUserSession from "@/lib/getUserSection";
import checkEnrollment from "@/lib/api/checkEnrollment";
import checkWishlist from "@/lib/api/checkWishlist";

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
  let isWishlisted = false;
  const user = await getUserSession();
  if (user) {
    [isEnrolled, isWishlisted] = await Promise.all([
      checkEnrollment(id),
      checkWishlist(id),
    ]);
  }

  return (
    <section>
      <CourseDetailsPage course={course} isEnrolled={isEnrolled} isWishlisted={isWishlisted} />
    </section>
  )
}

export default page;
