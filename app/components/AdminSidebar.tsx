'use client';

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useModal } from "./ModalProvider";
import {
    Building2,
    Megaphone,
    ImageIcon,
    LayoutGrid,
    Factory,
    Sparkles,
    Plus,
    LogOut,
    ExternalLink,
    User,
} from "lucide-react";

const adminLinks = [
    { name: "companies", href: "/admin/companies", addHref: "/admin/companies/create", icon: Building2 },
    { name: "campaigns", href: "/admin/campaigns", addHref: "/admin/campaigns/create", icon: Megaphone },
    { name: "banners", href: "/admin/banners", addHref: "/admin/banners/create", icon: ImageIcon },
    { name: "adformats", href: "/admin/adformats", addHref: "/admin/adformats/create", icon: LayoutGrid },
    { name: "industries", href: "/admin/industries", addHref: "/admin/industries/create", icon: Factory },
    { name: "effects", href: "/admin/effects", addHref: "/admin/effects/create", icon: Sparkles },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { openModal } = useModal();
    const [openLogout, setOpenLogout] = useState(false);

    const activeLink =
        adminLinks.find((link) => pathname.startsWith(link.href)) ||
        adminLinks.find((link) => link.name === "campaigns");

    const addLabel = `Add ${activeLink!.name.charAt(0).toUpperCase() + activeLink!.name.slice(1)}`;

    return (
        <aside
            className="
        fixed left-4 top-1/2 -translate-y-1/2 
        z-30 transition-all duration-300 ease-out
        h-[90vh] rounded-3xl shadow-xl shadow-black/5 overflow-hidden
        border border-white/50 bg-white/20 backdrop-blur-lg
        overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300
        lg:w-80 lg:left-6
        md:w-18 md:left-4
        max-md:hidden
      "
        >
            <div className="h-full p-6 text-black flex flex-col justify-between">
                <div className="hidden lg:flex flex-col gap-6">
                    <h3 className="font-medium text-xl text-[#267282]">Admin Panel</h3>

                    <nav className="flex flex-col gap-3">
                        {adminLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname.startsWith(link.href);

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-2xl text-sm uppercase tracking-wide
                                        transition-all
                                        ${isActive
                                            ? "bg-[#267282] text-white"
                                            : "text-gray-700 hover:bg-black/5"}
                                        `}
                                >
                                    <Icon className="w-4 h-4" />
                                    {link.name}
                                </Link>
                            );
                        })}

                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm uppercase tracking-wide
                            text-gray-700 hover:bg-black/5 mt-4"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View Main Site
                        </Link>
                    </nav>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => {
                            const modalTypes: Record<string, any> = {
                                adformats: "addAdFormat",
                                companies: "addCompany",
                                campaigns: "addCampaign",
                                industries: "addIndustry",
                                effects: "addEffect",
                                banners: "addBanner",
                            };
                            
                            console.log('Button clicked!');
                            console.log('Active section:', activeLink!.name);
                            console.log('Modal type:', modalTypes[activeLink!.name]);
                            
                            openModal({ type: modalTypes[activeLink!.name] });
                        }}
                        className="
                        w-full py-3 rounded-xl bg-[#267282] text-white
                        flex items-center justify-center gap-2 cursor-pointer
                        hover:bg-[#267282]/90 transition-all duration-300
                        "
                    >
                        <Plus className="w-4 h-4" />
                        {addLabel}
                    </button>

                    <div
                        onClick={() => setOpenLogout(true)}
                        className="
                        flex items-center gap-3 p-3 rounded-xl cursor-pointer
                        hover:bg-black/5 transition-all
                        "
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-700" />
                        </div>

                        <div className="leading-tight">
                            <p className="text-sm font-semibold">Admin User</p>
                            <p className="text-xs text-gray-500">admin@site.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {openLogout && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-[280px] text-center space-y-4">
                        <p className="font-semibold">Logout?</p>

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setOpenLogout(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => router.push("/login")}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
