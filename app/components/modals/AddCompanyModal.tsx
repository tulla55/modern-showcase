"use client";

import { useState } from "react";
import FormModal from "../FormModal";
import TextInput from "../form/TextInput";
import SelectInput from "../form/SelectInput";
import FileUpload from "../form/FileUpload";
import { useModal } from "../ModalProvider";

export default function AddCompanyModal() {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    logo: null as File | null,
  });
  const [errors, setErrors] = useState<{ name?: string; industry?: string; logo?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; industry?: string; logo?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Company name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Company name must be at least 2 characters";
    }

    if (!formData.industry) {
      newErrors.industry = "Please select an industry";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      console.log("Saving Company:", formData);
      console.log("Logo file:", formData.logo);
      
      // TODO: Upload logo to storage (Cloudinary, S3, etc.)
      // TODO: Save company data to database
      
      await new Promise((resolve) => setTimeout(resolve, 1000));

      closeModal();
      
      alert(`Company "${formData.name}" created successfully!`);
      
    } catch (error) {
      console.error("Error saving company:", error);
      alert("Error saving company. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal title="Add Company" onClose={closeModal} open={true} maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-4">Company Details</h3>

          <div className="text-xs space-y-4">
            <TextInput
              label="Company Name"
              name="name"
              placeholder="e.g., Nike, Coca-Cola"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />

            <SelectInput
              label="Industry"
              name="industry"
              required
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              error={errors.industry}
              options={[
                { value: "", label: "Select an industry" },
                { value: "technology", label: "Technology" },
                { value: "finance", label: "Finance" },
                { value: "healthcare", label: "Healthcare" },
                { value: "retail", label: "Retail" },
                { value: "food-beverage", label: "Food & Beverage" },
                { value: "sports", label: "Sports & Fitness" },
                { value: "automotive", label: "Automotive" },
                { value: "fashion", label: "Fashion" },
                { value: "entertainment", label: "Entertainment" },
                { value: "real-estate", label: "Real Estate" },
                { value: "education", label: "Education" },
                { value: "travel", label: "Travel & Tourism" },
                { value: "other", label: "Other" },
              ]}
            />

            <FileUpload
              label="Company Logo"
              name="logo"
              accept="image/*"
              onChange={(file) => setFormData({ ...formData, logo: file })}
              error={errors.logo}
              helperText="PNG, JPG or SVG (Max 2MB)"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={closeModal}
            disabled={isSubmitting}
            className="px-6 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-100 
                     rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-medium text-white bg-[#267282] hover:bg-[#267282]/90 
                     rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </>
            ) : (
              "Add Company"
            )}
          </button>
        </div>
      </form>
    </FormModal>
  );
}
