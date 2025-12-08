
"use client";

import { useState } from "react";
import FormModal from "../FormModal";
import TextInput from "../form/TextInput";
import { useModal } from "../ModalProvider";

export default function AddEffectModal() {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { name?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Effect name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Effect name must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      console.log("Saving Effect:", formData);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));

      closeModal();
      
      alert(`Effect "${formData.name}" created successfully!`);
      
    } catch (error) {
      console.error("Error saving effect:", error);
      alert("Error saving effect. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal title="Add Effect" onClose={closeModal} open={true} maxWidth="sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Effect Details</h3>

          <div className="space-y-4">
            <TextInput
              label="Effect Name"
              name="name"
              placeholder="e.g., 3D Spiral, Fade In, Parallax Scroll"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={closeModal}
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 
                     rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-medium text-white bg-[#267282] hover:bg-[#267282]/90 
                     rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed
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
              "Add Effect"
            )}
          </button>
        </div>
      </form>
    </FormModal>
  );
}
