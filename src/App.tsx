import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="about" element={<AboutPage/>}/>
      </Route>
    </Routes>
  );
}
