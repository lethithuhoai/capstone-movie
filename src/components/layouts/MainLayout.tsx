import { Tabs, TabsProps } from "antd";
import {
  // Home,
  // Footer,
  // Header,
  HomeTemplate,
  HomeTemplateFullFilm,
  HomeTemplateUpcoming,
} from "components";
import Banner from "components/ui/Banner";
// import { Outlet } from "react-router-dom";
import styled from "../../assets/mainLayout.module.css";

export const MainLayout = () => {
  // const navigate = useNavigate();
  const items: TabsProps["items"] = [
    {
      key: "fullFilm",
      label: "TẤT CẢ PHIM",
      children: <HomeTemplateFullFilm />,
    },
    {
      key: "dangChieu",
      label: "PHIM ĐANG CHIẾU",
      children: <HomeTemplate />,
    },
    {
      key: "sapChieu",
      label: "PHIM SẮP CHIẾU",
      children: <HomeTemplateUpcoming />,
    },
  ];

  const onChange = async (key: string) => {
    console.log(key);
    // navigate(`home/?${key}=true`);
  };

  return (
    <main>
      {/* <Header /> */}
      {/* <MainWrapper id="main-content">
        <Outlet />
      </MainWrapper> */}
      {/* <div id="main-content">
        <Outlet />
      </div> */}
      <br />
      <Banner />
      <Tabs
        defaultActiveKey="fullFilm"
        items={items}
        onChange={onChange}
        className={styled.tabsAntd}
        // style={{ marginLeft: 85, fontWeight: "bold" }}
      />
      {/* <Detail /> */}
      {/* <Footer /> */}
    </main>
  );
};
