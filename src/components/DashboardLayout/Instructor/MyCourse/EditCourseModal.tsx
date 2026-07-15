import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Image as ImageIcon } from 'lucide-react';
import { Course } from './types';
import { imageUpload } from '@/lib/imageUpload';

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onSave: (data: Partial<Course>) => void;
}

export function EditCourseModal({ isOpen, onClose, course, onSave }: EditCourseModalProps) {
  const [editRequirements, setEditRequirements] = useState<{value: string}[]>([]);
  const [editOutcomes, setEditOutcomes] = useState<{value: string}[]>([]);
  const [editIsFree, setEditIsFree] = useState<boolean>(false);
  const [editDifficulty, setEditDifficulty] = useState<string>("Beginner");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (course) {
      setEditRequirements(course.requirements && course.requirements.length > 0 ? [...course.requirements] : [{value: ""}]);
      setEditOutcomes(course.learningOutcomes && course.learningOutcomes.length > 0 ? [...course.learningOutcomes] : [{value: ""}]);
      setEditIsFree(course.isFree || false);
      setEditDifficulty(course.difficulty || "Beginner");
      setThumbnailPreview(course.thumbnailUrl || '');
    }
  }, [course]);

  if (!isOpen || !course) return null;

  // Dynamic Array Handlers
  const addRequirement = () => setEditRequirements([...editRequirements, { value: "" }]);
  const removeRequirement = (index: number) => setEditRequirements(editRequirements.filter((_, i) => i !== index));
  const updateRequirement = (index: number, value: string) => {
    const newReqs = [...editRequirements];
    newReqs[index].value = value;
    setEditRequirements(newReqs);
  };

  const addOutcome = () => setEditOutcomes([...editOutcomes, { value: "" }]);
  const removeOutcome = (index: number) => setEditOutcomes(editOutcomes.filter((_, i) => i !== index));
  const updateOutcome = (index: number, value: string) => {
    const newOutcomes = [...editOutcomes];
    newOutcomes[index].value = value;
    setEditOutcomes(newOutcomes);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Local preview
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
      
      // Upload to Imgbb
      try {
        const uploadData = await imageUpload(file);
        if (uploadData?.display_url) {
          setThumbnailPreview(uploadData.display_url);
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!course) return;
    
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());
    
    const data: Partial<Course> = {
      ...(formEntries as any),
      _id: course._id,
      thumbnailUrl: thumbnailPreview,
      difficulty: editDifficulty,
      isFree: editIsFree,
      price: editIsFree ? null : Number(formEntries.price || 0),
      discountPrice: editIsFree ? null : Number(formEntries.discountPrice || 0),
      requirements: editRequirements,
      learningOutcomes: editOutcomes,
    };
    
    onSave(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e293b] w-full max-w-4xl rounded-3xl p-6 md:p-8 shadow-xl border border-border dark:border-secondary max-h-[90vh] overflow-y-auto custom-scrollbar relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-text-secondary hover:text-danger hover:bg-danger-light rounded-full transition-colors cursor-pointer z-10"
        >
          <X size={24} />
        </button>
        <h3 className="text-2xl font-heading font-bold text-text-primary dark:text-surface mb-6 pb-4 border-b border-secondary-lighter dark:border-secondary pr-12">
          Edit Course Details
        </h3>
        
        <form onSubmit={handleSave} className="space-y-8">
          {/* Basic Info Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-semibold text-secondary dark:text-surface">Basic Information</h4>
            
            <div className="space-y-1.5">
              <label className="text-secondary dark:text-surface font-body font-medium text-sm">Course Title</label>
              <input 
                type="text" 
                name="title"
                defaultValue={course.title}
                className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-secondary dark:text-surface font-body font-medium text-sm">Short Description</label>
              <textarea 
                rows={2}
                name="shortDescription"
                defaultValue={course.shortDescription || ""}
                className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full resize-none text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-secondary dark:text-surface font-body font-medium text-sm">Full Description</label>
              <div className="border border-secondary-lighter dark:border-secondary rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary">
                <div className="bg-surface dark:bg-dark-bg border-b border-secondary-lighter dark:border-secondary px-3 py-2 flex gap-2">
                  <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors font-serif font-bold text-sm cursor-pointer">B</button>
                  <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors font-serif italic text-sm cursor-pointer">I</button>
                  <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors font-serif underline text-sm cursor-pointer">U</button>
                  <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors text-sm cursor-pointer">List</button>
                </div>
                <textarea
                  name="fullDescription"
                  defaultValue={course.fullDescription || ""}
                  className="min-h-[120px] w-full bg-white dark:bg-[#1e293b] px-4 py-3 text-secondary dark:text-surface font-body text-sm focus:outline-none resize-y"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-1.5 flex-1 max-w-sm">
                <label className="text-secondary dark:text-surface font-body font-medium text-sm">Thumbnail Image</label>
                <div className="relative rounded-2xl overflow-hidden w-full aspect-video group border-2 border-dashed border-secondary-lighter dark:border-secondary p-1">
                  {thumbnailPreview ? (
                    <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <div className="w-full h-full bg-surface dark:bg-[#0f172a] rounded-xl flex flex-col items-center justify-center text-secondary">
                      <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                      <span className="text-sm">No image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition-colors text-xs font-medium px-3 cursor-pointer"
                    >
                      Upload File
                    </button>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
              <div className="space-y-1.5 flex-1 flex flex-col justify-center">
                <label className="text-secondary dark:text-surface font-body font-medium text-sm">Image URL</label>
                <input 
                  type="url" 
                  value={thumbnailPreview}
                  readOnly
                  placeholder="Image URL will appear here..."
                  className="border border-secondary-lighter dark:border-secondary bg-surface dark:bg-dark-bg text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full cursor-not-allowed outline-none"
                />
                <p className="text-xs text-text-secondary mt-2">
                  This field displays the URL of the currently selected or uploaded image. Upload a new file to change it.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-secondary dark:text-surface font-body font-medium text-sm">Category</label>
                <select 
                  name="category"
                  defaultValue={course.category || "Web Development"}
                  className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full text-sm appearance-none cursor-pointer"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-secondary dark:text-surface font-body font-medium text-sm">Course Language</label>
                <select 
                  name="language"
                  defaultValue={course.language || "English"}
                  className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full text-sm appearance-none cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Bengali">Bengali</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-secondary dark:text-surface font-body font-medium text-sm">Difficulty Level</label>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setEditDifficulty("Beginner")} className={`rounded-xl px-5 py-2.5 font-body text-sm transition-all border font-semibold cursor-pointer ${editDifficulty === "Beginner" ? "bg-primary text-white border-primary" : "border-secondary-lighter text-secondary hover:border-primary hover:text-primary bg-white dark:bg-[#1e293b]"}`}>Beginner</button>
                <button type="button" onClick={() => setEditDifficulty("Intermediate")} className={`rounded-xl px-5 py-2.5 font-body text-sm transition-all border cursor-pointer ${editDifficulty === "Intermediate" ? "bg-primary text-white border-primary font-semibold" : "border-secondary-lighter text-secondary hover:border-primary hover:text-primary bg-white dark:bg-[#1e293b]"}`}>Intermediate</button>
                <button type="button" onClick={() => setEditDifficulty("Advanced")} className={`rounded-xl px-5 py-2.5 font-body text-sm transition-all border cursor-pointer ${editDifficulty === "Advanced" ? "bg-primary text-white border-primary font-semibold" : "border-secondary-lighter text-secondary hover:border-primary hover:text-primary bg-white dark:bg-[#1e293b]"}`}>Advanced</button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-secondary dark:text-surface font-body font-medium text-sm">Estimated Duration</label>
              <input type="text" name="estimatedDuration" defaultValue={course.estimatedDuration || ""} className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full" />
            </div>
          </div>

          {/* Pricing Section */}
          <div className="space-y-6 pt-6 border-t border-secondary-lighter dark:border-secondary">
            <h4 className="text-lg font-heading font-semibold text-secondary dark:text-surface">Pricing</h4>
            
            <div className="space-y-1.5">
              <label className="text-secondary dark:text-surface font-body font-medium text-sm">Course Type</label>
              <div className="flex items-center gap-4 mt-2">
                <span className={`font-body text-sm font-semibold ${!editIsFree ? "text-primary" : "text-secondary"}`}>Paid</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={editIsFree} 
                    onChange={(e) => setEditIsFree(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-secondary-lighter peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-secondary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <span className={`font-body text-sm font-semibold ${editIsFree ? "text-primary" : "text-secondary"}`}>Free</span>
              </div>
            </div>

            {!editIsFree && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-secondary dark:text-surface font-body font-medium text-sm">Price</label>
                  <div className="flex border border-secondary-lighter dark:border-secondary rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary bg-white dark:bg-[#1e293b]">
                    <span className="bg-surface dark:bg-dark-bg border-r border-secondary-lighter dark:border-secondary px-3 py-2.5 text-text-secondary font-body text-sm flex items-center justify-center">$</span>
                    <input type="number" name="price" defaultValue={course.price || ""} className="border-none focus:ring-0 focus:outline-none flex-1 px-4 py-2.5 text-secondary dark:text-surface bg-transparent" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-secondary dark:text-surface font-body font-medium text-sm">Discount Price</label>
                  <div className="flex border border-secondary-lighter dark:border-secondary rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary bg-white dark:bg-[#1e293b]">
                    <span className="bg-surface dark:bg-dark-bg border-r border-secondary-lighter dark:border-secondary px-3 py-2.5 text-text-secondary font-body text-sm flex items-center justify-center">$</span>
                    <input type="number" name="discountPrice" defaultValue={course.discountPrice || ""} className="border-none focus:ring-0 focus:outline-none flex-1 px-4 py-2.5 text-secondary dark:text-surface bg-transparent" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Course Details Section */}
          <div className="space-y-6 pt-6 border-t border-secondary-lighter dark:border-secondary">
            <h4 className="text-lg font-heading font-semibold text-secondary dark:text-surface">Course Details</h4>
            
            <div className="space-y-3">
              <label className="text-secondary dark:text-surface font-body font-medium text-sm">Course Requirements</label>
              {editRequirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={req.value} 
                    onChange={(e) => updateRequirement(idx, e.target.value)}
                    placeholder="e.g. Basic knowledge of HTML"
                    className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface flex-1 rounded-xl px-4 py-2.5" 
                  />
                  <button type="button" onClick={() => removeRequirement(idx)} className="text-text-secondary hover:text-danger-dark transition-colors p-2 cursor-pointer">✕</button>
                </div>
              ))}
              <button type="button" onClick={addRequirement} className="border border-dashed border-secondary-lighter hover:border-primary text-text-secondary hover:text-primary rounded-xl px-4 py-2.5 text-sm font-medium w-full transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer">
                <Plus size={16} /> Add Requirement
              </button>
            </div>

            <div className="space-y-3 pt-4">
              <label className="text-secondary dark:text-surface font-body font-medium text-sm">What Students Will Learn</label>
              {editOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={outcome.value} 
                    onChange={(e) => updateOutcome(idx, e.target.value)}
                    placeholder="e.g. Build a full-stack web application"
                    className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface flex-1 rounded-xl px-4 py-2.5" 
                  />
                  <button type="button" onClick={() => removeOutcome(idx)} className="text-text-secondary hover:text-danger-dark transition-colors p-2 cursor-pointer">✕</button>
                </div>
              ))}
              <button type="button" onClick={addOutcome} className="border border-dashed border-secondary-lighter hover:border-primary text-text-secondary hover:text-primary rounded-xl px-4 py-2.5 text-sm font-medium w-full transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer">
                <Plus size={16} /> Add Outcome
              </button>
            </div>

            <div className="space-y-1.5 pt-4">
              <label className="text-secondary dark:text-surface font-body font-medium text-sm">Target Audience</label>
              <textarea rows={3} name="targetAudience" defaultValue={course.targetAudience || ""} className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full resize-none text-sm" />
            </div>
            
            {/* Admin/Instructor only status edit */}
            <div className="space-y-1.5 pt-4">
              <label className="text-secondary dark:text-surface font-body font-medium text-sm">Current Status</label>
              <select 
                name="status"
                defaultValue={course.status}
                className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full text-sm appearance-none cursor-pointer"
              >
                <option value="Draft">Draft</option>
                <option value="Pending">Pending</option>
                <option value="Published">Published</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        
        <div className="sticky bottom-[-1.5rem] -mx-6 -mb-6 md:-mx-8 md:-mb-8 mt-8 bg-white dark:bg-[#1e293b] border-t border-border dark:border-secondary p-4 md:px-8 flex items-center justify-end gap-3 rounded-b-3xl z-10">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-text-secondary hover:bg-surface dark:hover:bg-dark-bg font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
