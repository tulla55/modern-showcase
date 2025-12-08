
"use client";

import { useState } from "react";
import SlideOverPanel from "../SlideOverPanel";
import SelectInput from "../form/SelectInput";
import TextInput from "../form/TextInput";
import CheckboxInput from "../form/CheckboxInput";
import { useModal } from "../ModalProvider";

const BANNER_DIMENSIONS = [
  { value: "300x250", label: "300×250 " },
  { value: "728x90", label: "728×90 " },
  { value: "160x600", label: "160×600 " },
  { value: "300x600", label: "300×600 " },
  { value: "336x280", label: "336×280 " },
  { value: "970x250", label: "970×250 " },
  { value: "320x50", label: "320×50 " },
  { value: "320x100", label: "320×100 " },
  { value: "320x480", label: "320×480 " },
];

export default function AddBannerModal() {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    campaign: "",
    adFormat: "",
    effect: "",
    markAllAsNew: false,
    urls: {
      "300x250": "",
      "728x90": "",
      "160x600": "",
      "300x600": "",
      "336x280": "",
      "970x250": "",
      "320x50": "",
      "320x100": "",
      "320x480": "",
    },
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: any = {};

    if (!formData.campaign) {
      newErrors.campaign = "Please select a campaign";
    }

    if (!formData.adFormat) {
      newErrors.adFormat = "Please select an ad format";
    }

    if (!formData.effect) {
      newErrors.effect = "Please select an effect";
    }

    const filledUrls = Object.values(formData.urls).filter((url) => url.trim());
    if (filledUrls.length === 0) {
      newErrors.urls = "Please provide at least one banner URL";
    }

    Object.entries(formData.urls).forEach(([dimension, url]) => {
      if (url && !url.match(/^https?:\/\/.+/)) {
        newErrors[`url_${dimension}`] = "Invalid URL format";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const filledUrls = Object.entries(formData.urls).filter(([, url]) => url.trim());
      
      console.log("Saving Banners:", {
        campaign: formData.campaign,
        adFormat: formData.adFormat,
        effect: formData.effect,
        markAllAsNew: formData.markAllAsNew,
        banners: filledUrls.map(([dimension, url]) => ({
          dimension,
          url,
        })),
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      closeModal();

      alert(`Success! ${filledUrls.length} banner${filledUrls.length > 1 ? 's' : ''} added for ${formData.campaign}`);
      
    } catch (error) {
      console.error("Error saving banners:", error);
      alert("Error saving banners. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filledCount = Object.values(formData.urls).filter((url) => url.trim()).length;

  return (
    <SlideOverPanel title="Add Campaign Banners" onClose={closeModal} open={true} width="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-900 mb-4">Campaign Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <SelectInput
              label="Campaign"
              name="campaign"
              required
              value={formData.campaign}
              onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
              error={errors.campaign}
              options={[
                { value: "", label: "Select campaign" },
                { value: "homeloan", label: "Home Loan" },
                { value: "summer-sale", label: "Summer Sale" },
                { value: "holiday-special", label: "Holiday Special" },
                { value: "back-to-school", label: "Back to School" },
              ]}
            />

            <SelectInput
              label="Ad Format"
              name="adFormat"
              required
              value={formData.adFormat}
              onChange={(e) => setFormData({ ...formData, adFormat: e.target.value })}
              error={errors.adFormat}
              options={[
                { value: "", label: "Select format" },
                { value: "html5", label: "HTML5" },
                { value: "static-image", label: "Static Image" },
                { value: "video", label: "Video" },
                { value: "rich-media", label: "Rich Media" },
              ]}
            />

            <SelectInput
              label="Effect"
              name="effect"
              required
              value={formData.effect}
              onChange={(e) => setFormData({ ...formData, effect: e.target.value })}
              error={errors.effect}
              options={[
                { value: "", label: "Select effect" },
                { value: "3d-spiral", label: "3D Spiral" },
                { value: "fade-in", label: "Fade In" },
                { value: "parallax", label: "Parallax Scroll" },
                { value: "carousel", label: "Carousel" },
                { value: "none", label: "None" },
              ]}
            />
          </div>

          <CheckboxInput
            label="Mark all as New"
            name="markAllAsNew"
            checked={formData.markAllAsNew}
            onChange={(e) => setFormData({ ...formData, markAllAsNew: e.target.checked })}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-900">
              Banner URLs ({filledCount}/9)
            </h3>
            {filledCount > 0 && (
              <span className="text-xs font-medium text-[#267282]">
                {filledCount === 9 ? "✓ All filled" : `${9 - filledCount} remaining`}
              </span>
            )}
          </div>

          {errors.urls && (
            <p className="text-sm text-red-600 mb-4">{errors.urls}</p>
          )}

          <div className="space-y-4">
            {BANNER_DIMENSIONS.map((dimension) => (
              <TextInput
                key={dimension.value}
                label={dimension.label}
                name={`url_${dimension.value}`}
                placeholder={`https://live.mediapal.net/cdn/.../chromatic/${dimension.value}/index.html`}
                value={formData.urls[dimension.value as keyof typeof formData.urls]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    urls: { ...formData.urls, [dimension.value]: e.target.value },
                  })
                }
                error={errors[`url_${dimension.value}`]}
                type="url"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {filledCount > 0 && `${filledCount} banner${filledCount > 1 ? 's' : ''} ready to add`}
          </div>
          <div className="flex gap-3">
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
              disabled={isSubmitting || filledCount === 0}
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
                  Adding {filledCount} Banner{filledCount > 1 ? 's' : ''}...
                </>
              ) : (
                `Add All Banners (${filledCount})`
              )}
            </button>
          </div>
        </div>
      </form>
    </SlideOverPanel>
  );
}
