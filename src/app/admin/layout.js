import NavbarAdmin from "@/components/admin/Navbar";
import SideNavbar from "@/components/admin/sideNav";
import "quill/dist/quill.snow.css";

export default function AdminLayout({ children }) {
  return (
    <section>
      <NavbarAdmin />
      <div className="flex h-[calc(100vh-70px)]">
        <SideNavbar />
        <section className="bg-blue-50/50 w-full">
          {children}
        </section>
      </div>
    </section>
  );
}
