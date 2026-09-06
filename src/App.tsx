import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import GalleryPage from "@/pages/GalleryPage";
import VolunteerPage from "@/pages/VolunteerPage";
import BecomeVolunteerPage from "@/pages/BecomeVolunteerPage";
import BecomeMemberPage from "@/pages/BecomeMemberPage";
import ProgramsPage from "@/pages/ProgramsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="about" element={<AboutPage/>}/>
        <Route path="contact" element={<ContactPage/>}/>
        <Route path="gallery" element={<GalleryPage/>}/>
        <Route path="volunteer" element={<VolunteerPage/>}/>
        <Route path="become-a-volunteer" element={<BecomeVolunteerPage/>}/>
        <Route path="become-a-member" element={<BecomeMemberPage/>}/>
        <Route path="programs" element={<ProgramsPage/>}/>
      </Route>
    </Routes>
  );
}
