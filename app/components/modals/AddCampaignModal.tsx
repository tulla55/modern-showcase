
"use client";

import { useState } from "react";
import FormModal from "../FormModal";
import TextInput from "../form/TextInput";
import NumberInput from "../form/NumberInput";
import SelectInput from "../form/SelectInput";
import FileUpload from "../form/FileUpload";
import { useModal } from "../ModalProvider";

export default function AddCampaignModal() {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: "",
    priority: 1,
    company: "",
    logo: null as File | null,
  });
  const [errors, setErrors] = useState<{ name?: string; priority?: string; company?: string; logo?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; priority?: string; company?: string; logo?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Campaign name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Campaign name must be at least 2 characters";
    }

    if (formData.priority < 1) {
      newErrors.priority = "Priority must be at least 1";
    }

    if (!formData.company) {
      newErrors.company = "Please select a company";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      console.log("Saving Campaign:", formData);
      console.log("Logo file:", formData.logo);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));

      closeModal();
      
      alert(`Campaign "${formData.name}" created successfully!`);
      
    } catch (error) {
      console.error("Error saving campaign:", error);
      alert("Error saving campaign. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal title="Add Campaign" onClose={closeModal} open={true} maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-base  font-semibold text-gray-900 mb-4">Campaign Details</h3>

          <div className="  text-xs grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Campaign Name"
              name="name"
              placeholder="e.g., Summer Sale 2024"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />

            <NumberInput
              label="Priority"
              name="priority"
              placeholder="1"
              required
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 1 })}
              min={1}
              error={errors.priority}
            />

            <div className="md:col-span-2">
              <SelectInput
                label="Company"
                name="company"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                error={errors.company}
                options={[
                  { value: "", label: "Select a company" },
                  { value: "nike", label: "Nike" },
                  { value: "coca-cola", label: "Coca-Cola" },
                  { value: "apple", label: "Apple" },
                  { value: "google", label: "Google" },
                  { value: "microsoft", label: "Microsoft" },
                  { value: "amazon", label: "Amazon" },
                  { value: "samsung", label: "Samsung" },
                  { value: "toyota", label: "Toyota" },
                  { value: "mcdonalds", label: "McDonald's" },
                  { value: "other", label: "Other" },
                ]}
              />
            </div>

            <div className="md:col-span-2">
              <FileUpload
                label="Campaign Logo"
                name="logo"
                accept="image/*"
                onChange={(file) => setFormData({ ...formData, logo: file })}
                error={errors.logo}
                helperText="PNG, JPG or SVG (Max 2MB)"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={closeModal}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 
                     rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-xs  font-medium text-white bg-[#267282] hover:bg-[#267282]/90 
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
              "Add Campaign"
            )}
          </button>
        </div>
      </form>
    </FormModal>
  );
}
