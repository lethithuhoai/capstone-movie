// import React from "react";
// import PropTypes from "prop-types";
import { Button, Col, Row, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { quanLyPhimServices } from "services/quanLyPhim";
import { quanLyRapServices } from "services/quanLyRap";
import { Footer, Header } from ".";
import moment from "moment";
import { PATH } from "constant";
import { useAuth } from "hooks";
import { Cinema } from "types";
import { toast } from 'react-toastify';

Detail.propTypes = {};

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();

  const { accessToken } = useAuth();

  const [movieInfo, setMovieInfo] = useState({
    hinhAnh: "",
    tenPhim: "",
    moTa: "",
    trailer: "",
    ngayKhoiChieu: "",
  });
  const [postCinema, setPostCinema] = useState([]);
  const [dataCinimaMovie, setDataCinemaMovie] = useState([]);
  const [clickCinema, setClickCinema] = useState("");
  useEffect(() => {
    handleGetDetailMovie();
    fetchPostCinema();
  }, []);

  const handleGetDetailMovie = async () => {
    try {
      const query = new URLSearchParams(location.search);
      const maPhim = query.get("maPhim");

      const data = await quanLyPhimServices.getMovieDetail(`maPhim=${maPhim}`);
      setMovieInfo(data.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPostCinema = async () => {
    try {
      const query = new URLSearchParams(location.search);
      const maPhim = query.get("maPhim");
      const data = await quanLyRapServices.getPosts(`maPhim=${maPhim}`);

      const dataPost = data.data.content?.heThongRapChieu;
      setPostCinema(dataPost);
      setDataCinemaMovie(dataPost?.[0]?.cumRapChieu);
      setClickCinema(dataPost?.[0]?.maHeThongRap);
    } catch (error) {
      console.log("Failed to fetch post list: ", error);
    }
  };

  const handleShowCinema = (value: Cinema) => {
    return (
      <div
        style={{
          position: "relative",
          background: "white",
          opacity: "0.7",
          width: "100%",
          height: "65px",
          marginBottom: "10px",
        }}
      >
        <Row
          gutter={[16, 16]}
          style={{ marginBottom: "30px", cursor: "pointer" }}
          onClick={() => {
            setDataCinemaMovie(value?.cumRapChieu);
            setClickCinema(value?.maHeThongRap);
          }}
        >
          <Col span={5}>
            <div style={{ width: "50px", height: "50px" }}>
              <img
                src={value?.logo}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col span={19}>
            <p>{value?.tenHeThongRap}</p>
            <p style={{ color: "gray" }}>Chọn rạp để biết lịch chiếu</p>
          </Col>
        </Row>
      </div>
    );
  };

  const handleShowData = () => {
    return postCinema?.map((value: Cinema) => {
      console.log({ value });
      // console.log(value?.maHeThongRap);

      if (value?.maHeThongRap !== clickCinema) {
        return handleShowCinema(value);
      }

      return (
        <Row
          gutter={[16, 16]}
          style={{ marginBottom: "30px", cursor: "pointer" }}
          onClick={() => {
            setDataCinemaMovie(value?.cumRapChieu);
          }}
        >
          <Col span={5}>
            <div style={{ width: "50px", height: "50px" }}>
              <img
                src={value?.logo}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col span={19}>
            <p>{value?.tenHeThongRap}</p>
            <p style={{ color: "gray" }}>Chọn rạp để biết lịch chiếu</p>
          </Col>
        </Row>
      );
    });
  };

  const handleShowCinemaMovie = () => {
    return dataCinimaMovie?.map((e) => {
      const lichChieu = e?.lichChieuPhim;
      // console.log(lichChieu, e);

      return (
        <Row gutter={[16, 16]} style={{ marginBottom: "30px" }}>
          <Col span={3}>
            <div style={{ width: "50px", height: "50px" }}>
              <img
                src={e?.hinhAnh}
                style={{ width: "100%", height: "100%", textAlign: "center" }}
              />
            </div>
            <div>
              <p
                style={{
                  marginLeft: "9px",
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#736e6e",
                }}
              >
                2D
              </p>
              <p
                style={{
                  marginLeft: "9px",
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#736e6e",
                }}
              >
                2D
              </p>
            </div>
          </Col>
          <Col span={21}>
            <p style={{ fontWeight: "bold" }}>{e?.tenCumRap}</p>
            <p>{e?.diaChi}</p>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {lichChieu?.map((item) => (
                <p
                  style={{
                    marginRight: "10px",
                    fontSize: "23px",
                    color: "green",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (accessToken) {
                      navigate(
                        PATH.movieBooking + `/?maLichChieu=${item.maLichChieu}`
                      );
                    } else {
                      navigate(PATH.register);
                    }
                  }}
                >
                  {moment(item.ngayChieuGioChieu).format("HH:mm")}
                </p>
              ))}
            </div>
          </Col>
        </Row>
      );
    });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Thứ 2",
      children: handleShowCinemaMovie(),
    },
    {
      key: "2",
      label: "Thứ 3",
      children: handleShowCinemaMovie(),
    },
    {
      key: "3",
      label: "Thứ 4",
      children: handleShowCinemaMovie(),
    },
    {
      key: "4",
      label: "Thứ 5",
      children: handleShowCinemaMovie(),
    },
    {
      key: "5",
      label: "Thứ 6",
      children: handleShowCinemaMovie(),
    },
    {
      key: "6",
      label: "Thứ 7",
      children: handleShowCinemaMovie(),
    },
  ];

  console.log({ dataCinimaMovie });

  return (
    <div>
      <Header />
      <br />

      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px 40px" }}>
        <div>
          <span style={{ fontWeight: "bold" }}>
            <Link to="/">Trang chủ</Link>
          </span>
          <span style={{ fontWeight: "bold" }}> | {movieInfo?.tenPhim}</span>
        </div>

        <br />

        <Row gutter={[16, 16]}>
          <Col  xs={{span: 24}} xl={{span:7}}>
            <img
              src={movieInfo?.hinhAnh}
              style={{ height: "400px", width: "300px" }}
            />
          </Col>
          <Col xs={{span: 24}} xl={{span:17}}>
            <b style={{ textTransform: "uppercase", fontSize: "20px" }}>
              {movieInfo?.tenPhim}
            </b>
            <br />
            <br />
            <p style={{ fontSize: "15px" }}>{movieInfo?.moTa}</p>
            <br />
            <Row>
              <Col span={2} style={{ fontSize: "15px" }}>
                Trailer:
              </Col>
              <Col span={22} style={{ color: "red" }}>
                <p style={{ fontSize: "15px" }}>{movieInfo?.trailer}</p>
                <br />
              </Col>
            </Row>
            <Row>
              <Col span={4} style={{ fontSize: "15px" }}>
                Ngày khởi chiếu:
                <br />
                <br />
              </Col>
              <Col span={20} style={{ fontSize: "15px" }}>
                {movieInfo?.ngayKhoiChieu}
              </Col>
            </Row>
            <Button
              style={{
                backgroundColor: "#e50914",
                color: "white",
              }}
            >
              <Link to={movieInfo.trailer} target="_blank">
                XEM TRAILER
              </Link>
            </Button>
            <Button
              style={{
                marginLeft: "10px",
                backgroundColor: "#e50914",
                color: "white",
              }}
              onClick={()=>{
                toast.warning("Vui lòng chọn rạp và giờ xem ngay bên dưới")
              }}
            >
              MUA VÉ NGAY
            </Button>
          </Col>
        </Row>
        <br />
        <Row gutter={[16, 16]}>
          <Col xs={{span: 24}} xl={{span:7}}>{handleShowData()}</Col>
          <Col xs={{span: 24}} xl={{span:17}}>
            <Tabs defaultActiveKey="1" items={items} />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
