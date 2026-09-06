import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import GalleryPage from "@/pages/GalleryPage";
import VolunteerPage from "@/pages/VolunteerPage";
import BecomeVolunteerPage from "@/pages/BecomeVolunteerPage";

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
      </Route>
    </Routes>
  );
}
