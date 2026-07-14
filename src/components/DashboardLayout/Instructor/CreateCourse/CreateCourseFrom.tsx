"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  CheckCheck,
  UploadCloud,
  Trash2,
  RefreshCw,
  Tag,
  ArrowLeft,
  ArrowRight,
  PlusCircle,
  Save,
  SendHorizontal,
  Loader2,
  CheckCircle2,
  Clock,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { imageUpload } from "@/lib/imageUpload";

// Zod Schema
const courseSchema = z
  .object({
    title: z.string().min(10, "Title must be at least 10 characters").max(100, "Max 100 characters"),
    shortDescription: z.string().min(1, "Required").max(150, "Max 150 characters"),
    fullDescription: z.string().min(100, "Full description must be at least 100 characters"),
    thumbnailUrl: z.string().min(1, "Thumbnail is required"),
    category: z.string().min(1, "Category is required"),
    difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
    language: z.string().min(1, "Language is required"),
    estimatedDuration: z.string().min(1, "Estimated duration is required"),
    isFree: z.boolean(),
    price: z.number().positive().optional().or(z.nan()).or(z.literal("").transform(() => undefined)),
    discountPrice: z.number().positive().optional().or(z.nan()).or(z.literal("").transform(() => undefined)),
    requirements: z.array(z.object({ value: z.string().min(1, "Required") })).min(1, "At least 1 requirement needed").max(10),
    learningOutcomes: z.array(z.object({ value: z.string().min(1, "Required") })).min(1, "At least 1 outcome needed").max(10),
    targetAudience: z.string().min(30, "Min 30 characters").max(500, "Max 500 characters"),
  })
  .refine((data) => data.isFree || (data.price !== undefined && data.price > 0 && !isNaN(data.price)), {
    message: "Price is required for paid courses",
    path: ["price"],
  })
  .refine((data) => !data.discountPrice || (data.price && data.discountPrice < data.price), {
    message: "Discount must be less than original price",
    path: ["discountPrice"],
  });

type FormData = z.infer<typeof courseSchema>;

const step1Fields = ["title", "shortDescription", "fullDescription", "thumbnailUrl", "category", "difficulty", "language", "estimatedDuration"] as const;
const step2Fields = ["isFree", "price", "discountPrice"] as const;
const step3Fields = ["requirements", "learningOutcomes", "targetAudience"] as const;

interface CreateCourseFromProps {
  onSubmitForm: (data: FormData, status: "draft" | "published") => Promise<{ success: boolean; data?: any; error?: string }>;
}

const CreateCourseFrom = ({ onSubmitForm }: CreateCourseFromProps) => {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<"published" | "draft">("draft");
  
  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
      thumbnailUrl: "",
      category: "",
      difficulty: "Beginner",
      language: "",
      estimatedDuration: "",
      isFree: false,
      price: undefined,
      discountPrice: undefined,
      requirements: [{ value: "" }],
      learningOutcomes: [{ value: "" }],
      targetAudience: "",
    },
    mode: "onChange",
  });

  const { fields: reqFields, append: appendReq, remove: removeReq } = useFieldArray({ control, name: "requirements" });
  const { fields: outFields, append: appendOut, remove: removeOut } = useFieldArray({ control, name: "learningOutcomes" });

  const watchShortDesc = watch("shortDescription");
  const watchIsFree = watch("isFree");
  const watchPrice = watch("price");
  const watchDiscount = watch("discountPrice");
  const watchThumbnail = watch("thumbnailUrl");

  const handleNext = async (currentStep: number) => {
    let isValid = false;
    if (currentStep === 1) isValid = await trigger(step1Fields);
    if (currentStep === 2) isValid = await trigger(step2Fields);
    
    if (isValid) {
      setStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: FormData, status: "draft" | "published") => {
    setIsSubmittingForm(true);
    const result = await onSubmitForm(data, status);
    setIsSubmittingForm(false);
    
    if (result.success) {
      setSubmittedStatus(status);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert(result.error || "Something went wrong.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit.");
        return;
      }
      // Show local preview immediately
      const localUrl = URL.createObjectURL(file);
      setValue("thumbnailUrl", localUrl, { shouldValidate: true });

      // Upload to Imgbb and replace with permanent URL
      setIsUploadingImage(true);
      try {
        const uploaded = await imageUpload(file);
        if (uploaded?.display_url) {
          setValue("thumbnailUrl", uploaded.display_url, { shouldValidate: true });
        }
      } catch (err) {
        alert("Image upload failed. Please try again.");
        setValue("thumbnailUrl", "", { shouldValidate: true });
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  if (isSuccess) {
    const isPublished = submittedStatus === "published";
    return (
      <div className="flex flex-col items-center text-center py-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`${isPublished ? 'bg-primary-light' : 'bg-surface dark:bg-dark-bg border border-secondary-lighter'} rounded-full p-6 mb-6 mx-auto`}
        >
          <CheckCircle2 className={`${isPublished ? 'text-primary' : 'text-text-secondary'} w-14 h-14`} />
        </motion.div>
        <h2 className="text-secondary dark:text-surface font-heading font-bold text-2xl">
          {isPublished ? 'Course Published!' : 'Course Saved as Draft!'}
        </h2>
        <p className="mt-3 max-w-md mx-auto text-text-secondary font-body leading-relaxed">
          {isPublished
            ? 'Your course is now live and available to students on the platform.'
            : 'Your course has been saved as a draft. You can continue editing and publish it whenever you are ready.'}
        </p>
        <div className={`mt-4 ${
          isPublished
            ? 'bg-primary-light border border-primary/20 text-primary-dark'
            : 'bg-surface dark:bg-dark-bg border border-secondary-lighter text-text-secondary'
          } rounded-full px-4 py-1.5 text-sm font-medium inline-flex items-center gap-2`}>
          {isPublished
            ? <><CheckCheck className="w-3.5 h-3.5" /> Status: Published</>
            : <><Save className="w-3.5 h-3.5" /> Status: Draft</> }
        </div>
        <div className="mt-8 flex gap-4 justify-center">
          <button onClick={() => window.location.href = "/dashboard/instructor/courses"} className="bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl px-6 py-3 transition-colors">
            Go to My Courses
          </button>
          <button onClick={() => { setIsSuccess(false); setStep(1); }} className="border border-secondary-lighter text-secondary hover:bg-primary-light hover:border-primary hover:text-primary-dark rounded-xl px-6 py-3 font-semibold transition-colors">
            Create Another Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Sticky Top Progress Bar */}
      <div className="bg-white dark:bg-[#1e293b] border-b border-secondary-lighter dark:border-secondary sticky top-16 z-30 pt-5 pb-8 shadow-sm -mx-8 -mt-8 px-8 mb-8 rounded-t-3xl">
        <div className="flex items-center justify-between mx-auto relative px-4 md:px-16 lg:px-32">
          {[1, 2, 3].map((s, index) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-all duration-300",
                    step > s
                      ? "bg-primary text-white"
                      : step === s
                      ? "bg-primary text-white ring-4 ring-primary/20"
                      : "bg-secondary-lighter text-text-secondary dark:bg-[#334155] dark:text-secondary-lighter"
                  )}
                >
                  {step > s ? <CheckCheck className="w-4 h-4" /> : s}
                </div>
                <span
                  className={cn(
                    "text-xs font-body font-medium mt-2 absolute -bottom-7 whitespace-nowrap",
                    step >= s ? "text-primary font-bold" : "text-text-secondary"
                  )}
                >
                  {s === 1 ? "Basic Info" : s === 2 ? "Pricing" : "Course Details"}
                </span>
              </div>
              {index < 2 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-colors duration-300",
                    step > s + 0.5 ? "bg-primary" : "bg-secondary-lighter dark:bg-[#334155]"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form>
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="mb-6">
              <span className="bg-primary-light text-primary-dark border border-secondary-lighter rounded-full px-3 py-1 text-xs mb-3 inline-block font-medium">
                Step 1 of 3
              </span>
              <h2 className="text-secondary dark:text-surface font-heading font-semibold text-xl">
                Basic Information
              </h2>
            </div>

            <div className="space-y-1.5">
              <Label className="text-secondary dark:text-surface font-body font-medium text-sm">Course Title</Label>
              <Input
                {...register("title")}
                placeholder="e.g. Complete Web Development Bootcamp"
                className="border-secondary-lighter dark:border-secondary focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full"
              />
              {errors.title && <p className="text-danger-dark text-xs">{errors.title.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-secondary dark:text-surface font-body font-medium text-sm">Short Description</Label>
              <textarea
                {...register("shortDescription")}
                rows={2}
                className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full resize-none text-sm"
                placeholder="A brief summary of what students will learn (max 150 characters)"
              />
              <div className="flex justify-between items-center">
                {errors.shortDescription ? (
                  <p className="text-danger-dark text-xs">{errors.shortDescription.message}</p>
                ) : <span />}
                <span className={cn("text-xs", (watchShortDesc?.length || 0) > 150 ? "text-danger-dark" : "text-text-secondary")}>
                  {watchShortDesc?.length || 0} / 150
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-secondary dark:text-surface font-body font-medium text-sm">Full Description</Label>
              <div className="border border-secondary-lighter dark:border-secondary rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary">
                <div className="bg-surface dark:bg-dark-bg border-b border-secondary-lighter dark:border-secondary px-3 py-2 flex gap-2">
                  <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors"><Bold className="w-4 h-4"/></button>
                  <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors"><Italic className="w-4 h-4"/></button>
                  <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors"><Underline className="w-4 h-4"/></button>
                  <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors"><List className="w-4 h-4"/></button>
                  <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors"><ListOrdered className="w-4 h-4"/></button>
                  <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors"><LinkIcon className="w-4 h-4"/></button>
                </div>
                <textarea
                  {...register("fullDescription")}
                  className="min-h-[160px] w-full bg-white dark:bg-[#1e293b] px-4 py-3 text-secondary dark:text-surface font-body text-sm focus:outline-none resize-y"
                  placeholder="Provide a detailed description of your course..."
                />
              </div>
              {errors.fullDescription && <p className="text-danger-dark text-xs">{errors.fullDescription.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-secondary dark:text-surface font-body font-medium text-sm">Thumbnail Image</Label>
              <input type="file" id="thumbnail-upload" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={handleImageUpload} />
              
              {!watchThumbnail ? (
                <label
                  htmlFor="thumbnail-upload"
                  className="block border-2 border-dashed border-secondary-lighter dark:border-secondary rounded-2xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary-light/30 transition-all duration-200 bg-surface dark:bg-dark-bg"
                >
                  {isUploadingImage ? (
                    <>
                      <Loader2 className="text-primary w-9 h-9 mx-auto mb-3 animate-spin" />
                      <p className="text-secondary dark:text-surface font-heading font-semibold text-sm">Uploading image...</p>
                      <p className="text-text-secondary text-xs mt-1">Please wait while we upload your thumbnail</p>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="text-primary w-9 h-9 mx-auto mb-3" />
                      <p className="text-secondary dark:text-surface font-heading font-semibold text-sm">Drag & drop your thumbnail here</p>
                      <p className="text-text-secondary text-xs mt-1">or click to browse — JPG, PNG, WEBP only · Max 2MB</p>
                    </>
                  )}
                </label>
              ) : (
                <div className="relative rounded-2xl overflow-hidden w-full aspect-video group">
                  {isUploadingImage && (
                    <div className="absolute inset-0 z-10 bg-black/50 flex flex-col items-center justify-center gap-2">
                      <Loader2 className="text-white w-8 h-8 animate-spin" />
                      <p className="text-white text-sm font-medium">Uploading to cloud...</p>
                    </div>
                  )}
                  <Image src={watchThumbnail} alt="Thumbnail preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => setValue("thumbnailUrl", "", { shouldValidate: true })} className="bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <label htmlFor="thumbnail-upload" className="bg-white/20 hover:bg-white/40 p-2 rounded-full text-white cursor-pointer transition-colors">
                      <RefreshCw className="w-5 h-5" />
                    </label>
                  </div>
                </div>
              )}
              {errors.thumbnailUrl && <p className="text-danger-dark text-xs">{errors.thumbnailUrl.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label className="text-secondary dark:text-surface font-body font-medium text-sm">Category</Label>
                <select
                  {...register("category")}
                  className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full text-sm appearance-none"
                >
                  <option value="">Select a category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Business">Business</option>
                  <option value="Photography">Photography</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && <p className="text-danger-dark text-xs">{errors.category.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label className="text-secondary dark:text-surface font-body font-medium text-sm">Course Language</Label>
                <select
                  {...register("language")}
                  className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full text-sm appearance-none"
                >
                  <option value="">Select language</option>
                  <option value="English">English</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Arabic">Arabic</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Other">Other</option>
                </select>
                {errors.language && <p className="text-danger-dark text-xs">{errors.language.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-secondary dark:text-surface font-body font-medium text-sm">Difficulty Level</Label>
              <Controller
                control={control}
                name="difficulty"
                render={({ field }) => (
                  <div className="flex gap-3">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => field.onChange(level)}
                        className={cn(
                          "rounded-xl px-5 py-2.5 font-body text-sm transition-all border",
                          field.value === level
                            ? "bg-primary text-white border-primary font-semibold"
                            : "border-secondary-lighter text-secondary hover:border-primary hover:text-primary bg-white dark:bg-[#1e293b]"
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                )}
              />
              {errors.difficulty && <p className="text-danger-dark text-xs">{errors.difficulty.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-secondary dark:text-surface font-body font-medium text-sm">Estimated Duration</Label>
              <Input
                {...register("estimatedDuration")}
                placeholder="e.g. 12 hours 30 minutes"
                className="border-secondary-lighter dark:border-secondary focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full"
              />
              <p className="text-text-secondary text-xs mt-1">Total video/content hours across all lessons</p>
              {errors.estimatedDuration && <p className="text-danger-dark text-xs">{errors.estimatedDuration.message}</p>}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => handleNext(1)}
                className="bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl px-7 py-3 flex items-center gap-2 transition-colors"
              >
                Next: Pricing <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Pricing */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="mb-6">
              <span className="bg-primary-light text-primary-dark border border-secondary-lighter rounded-full px-3 py-1 text-xs mb-3 inline-block font-medium">
                Step 2 of 3
              </span>
              <h2 className="text-secondary dark:text-surface font-heading font-semibold text-xl">
                Pricing
              </h2>
            </div>

            <div className="space-y-1.5">
              <Label className="text-secondary dark:text-surface font-body font-medium text-sm">Course Type</Label>
              <div className="flex items-center gap-4 mt-2">
                <span className={cn("font-body text-sm", !watchIsFree ? "text-primary font-semibold" : "text-secondary")}>Paid</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    {...register("isFree")}
                  />
                  <div className="w-11 h-6 bg-secondary-lighter peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-secondary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <span className={cn("font-body text-sm", watchIsFree ? "text-primary font-semibold" : "text-secondary")}>Free</span>
              </div>
              <p className="text-text-secondary text-xs mt-1">
                {watchIsFree ? "Students can enroll at no cost." : "Set a price and optional discount below."}
              </p>
            </div>

            {!watchIsFree && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="space-y-1.5">
                  <Label className="text-secondary dark:text-surface font-body font-medium text-sm">Price</Label>
                  <div className="flex border border-secondary-lighter dark:border-secondary rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary bg-white dark:bg-[#1e293b]">
                    <span className="bg-surface dark:bg-dark-bg border-r border-secondary-lighter dark:border-secondary px-3 py-2.5 text-text-secondary font-body text-sm flex items-center justify-center">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      {...register("price", { valueAsNumber: true })}
                      placeholder="29.99"
                      className="border-none focus:ring-0 focus:outline-none flex-1 px-4 py-2.5 text-secondary dark:text-surface bg-transparent"
                    />
                  </div>
                  {errors.price && <p className="text-danger-dark text-xs">{errors.price.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-secondary dark:text-surface font-body font-medium text-sm">Discount Price (Optional)</Label>
                  <div className="flex border border-secondary-lighter dark:border-secondary rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary bg-white dark:bg-[#1e293b]">
                    <span className="bg-surface dark:bg-dark-bg border-r border-secondary-lighter dark:border-secondary px-3 py-2.5 text-text-secondary font-body text-sm flex items-center justify-center">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      {...register("discountPrice", { valueAsNumber: true })}
                      placeholder="19.99"
                      className="border-none focus:ring-0 focus:outline-none flex-1 px-4 py-2.5 text-secondary dark:text-surface bg-transparent"
                    />
                  </div>
                  <p className="text-text-secondary text-xs mt-1">Leave empty if no discount. Must be less than original price.</p>
                  {errors.discountPrice && <p className="text-danger-dark text-xs">{errors.discountPrice.message}</p>}
                  
                  {watchPrice && watchDiscount && watchPrice > watchDiscount && (
                    <div className="bg-primary-light border border-secondary-lighter rounded-xl px-4 py-2 mt-3 flex items-center gap-2">
                      <Tag className="text-primary w-4 h-4" />
                      <span className="text-primary-dark font-semibold text-sm">
                        Students save ${(watchPrice - watchDiscount).toFixed(2)} ({Math.round(((watchPrice - watchDiscount) / watchPrice) * 100)}% off)
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="border border-secondary-lighter text-secondary hover:bg-primary-light hover:border-primary hover:text-primary-dark rounded-xl px-6 py-3 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => handleNext(2)}
                className="bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl px-7 py-3 flex items-center gap-2 transition-colors"
              >
                Next: Course Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Course Details */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="mb-6">
              <span className="bg-primary-light text-primary-dark border border-secondary-lighter rounded-full px-3 py-1 text-xs mb-3 inline-block font-medium">
                Step 3 of 3
              </span>
              <h2 className="text-secondary dark:text-surface font-heading font-semibold text-xl">
                Course Details
              </h2>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-secondary dark:text-surface font-body font-medium text-sm">Course Requirements</Label>
                <p className="text-text-secondary text-xs mt-0.5">What should students know before starting?</p>
              </div>
              
              {reqFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    {...register(`requirements.${index}.value` as const)}
                    placeholder="e.g. Basic knowledge of HTML"
                    className="border-secondary-lighter dark:border-secondary focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface flex-1 rounded-xl px-4 py-2.5"
                  />
                  <button
                    type="button"
                    onClick={() => removeReq(index)}
                    className="text-text-secondary hover:text-danger-dark transition-colors p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {errors.requirements && <p className="text-danger-dark text-xs">{errors.requirements.message || errors.requirements.root?.message}</p>}
              
              {reqFields.length < 10 && (
                <button
                  type="button"
                  onClick={() => appendReq({ value: "" })}
                  className="border border-dashed border-secondary-lighter hover:border-primary text-text-secondary hover:text-primary rounded-xl px-4 py-2.5 text-sm font-medium w-full transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <PlusCircle className="w-4 h-4" /> Add Requirement
                </button>
              )}
            </div>

            <div className="space-y-3 pt-4 border-t border-secondary-lighter dark:border-secondary">
              <div>
                <Label className="text-secondary dark:text-surface font-body font-medium text-sm">What Students Will Learn</Label>
                <p className="text-text-secondary text-xs mt-0.5">List the key skills or knowledge they&apos;ll gain.</p>
              </div>
              
              {outFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    {...register(`learningOutcomes.${index}.value` as const)}
                    placeholder="e.g. Build a full-stack web application"
                    className="border-secondary-lighter dark:border-secondary focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface flex-1 rounded-xl px-4 py-2.5"
                  />
                  <button
                    type="button"
                    onClick={() => removeOut(index)}
                    className="text-text-secondary hover:text-danger-dark transition-colors p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {errors.learningOutcomes && <p className="text-danger-dark text-xs">{errors.learningOutcomes.message || errors.learningOutcomes.root?.message}</p>}
              
              {outFields.length < 10 && (
                <button
                  type="button"
                  onClick={() => appendOut({ value: "" })}
                  className="border border-dashed border-secondary-lighter hover:border-primary text-text-secondary hover:text-primary rounded-xl px-4 py-2.5 text-sm font-medium w-full transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <PlusCircle className="w-4 h-4" /> Add Outcome
                </button>
              )}
            </div>

            <div className="space-y-1.5 pt-4 border-t border-secondary-lighter dark:border-secondary">
              <Label className="text-secondary dark:text-surface font-body font-medium text-sm">Target Audience</Label>
              <textarea
                {...register("targetAudience")}
                rows={3}
                className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full resize-none text-sm"
                placeholder="e.g. Beginners who want to learn web development from scratch with no prior experience."
              />
              <p className="text-text-secondary text-xs mt-0.5">Who is this course designed for?</p>
              {errors.targetAudience && <p className="text-danger-dark text-xs">{errors.targetAudience.message}</p>}
            </div>

            <div className="mt-10 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="border border-secondary-lighter text-secondary hover:bg-primary-light hover:border-primary hover:text-primary-dark rounded-xl px-6 py-3 font-semibold text-sm transition-all flex items-center gap-2"
                disabled={isSubmittingForm}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSubmit((data) => onSubmit(data, "draft"))}
                  disabled={isSubmittingForm}
                  className="border border-secondary-lighter text-secondary hover:bg-primary-light hover:border-primary hover:text-primary-dark rounded-xl px-6 py-3 font-semibold text-sm transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" /> Save Draft
                </button>
                <button
                  type="button"
                  onClick={handleSubmit((data) => onSubmit(data, "published"))}
                  disabled={isSubmittingForm}
                  className="bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl px-7 py-3 flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isSubmittingForm ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCheck className="w-4 h-4" />}
                  {isSubmittingForm ? "Publishing..." : "Publish Course"}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCourseFrom;
