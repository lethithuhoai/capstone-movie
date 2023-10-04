// import { Skeleton } from "antd"; luu y import tu component
// import { Card, Footer, Header } from "components";
import { Card, Skeleton } from "components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { getMovieListThunk } from "store/quanLyPhim";
import style from "../../assets/HomeTemplate.module.css";
// import { Image, Input } from 'components';

export const HomeTemplateFullFilm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { movieList, isFetchingMovieList } = useSelector(
    (state: RootState) => state.quanLyPhim
  );

  useEffect(() => {
    dispatch(getMovieListThunk());
  }, [dispatch]);

  // lam cai loading
  if (isFetchingMovieList) {
    return (
      <div className="flex justify-evenly flex-wrap">
        {[...Array(12)].map((value, index) => {
          return (
            <Card className="!w-[350px] !mt-20" key={index}>
              <Skeleton.Image className="w-full !h-[250px]" />
              <Skeleton.Input className="!w-full mt-16" />
              <Skeleton.Input className="!w-full mt-16" />
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex justify-evenly flex-wrap">
      {movieList?.map((movie) => (
        <Card
          key={movie.maPhim}
          onClick={() => navigate(`/detail?maPhim=${movie.maPhim}`)}
          hoverable
          className={`!mt-20 Card ${style.Card}`}
          cover={<img alt="example" src={movie.hinhAnh} />}
        >
          <Card.Meta
            title={movie.tenPhim}
            description={movie.moTa.substring(0, 30)}
          />
        </Card>
      ))}
    </div>
  );
};
