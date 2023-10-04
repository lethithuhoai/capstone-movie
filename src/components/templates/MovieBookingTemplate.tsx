import { Button, Footer, Header } from 'components'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { datVeThunk, lichChieuPhimThunk } from 'store/quanLyDatVe';
import styled from 'styled-components';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sleep } from 'utils';

export const MovieBookingTemplate = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { boxOfficeList } = useSelector((state: RootState) => state.quanLyDatVe)

   const [booking, setBooking] = useState<string[]>([]);

   const [infoBooking, setInfoBooking] = useState<{ name: string, price: number }[]>([]);

   const [totalPrice, setTotalPrice] = useState([]);
   const calculateTotalPrice = () => {
      const total = infoBooking?.reduce((total, item) => total + item.price, 0);
      return total;
   };
   const query = new URLSearchParams(location.search);
   const maLichChieu = query.get("maLichChieu");
   useEffect(() => {
      dispatch(lichChieuPhimThunk(Number(maLichChieu)))
      //truyền id lichChieu vào để render theo lịch chiếu hiện tại đang cứng
   }, [dispatch,maLichChieu])
   return (<>
      <Header />
      <div className='px-10 mt-20'>
         <div className='grid grid-cols-2 gap-4'>
            <div className=''>
               <div className='text-center'>Màn Hình</div>
               <p className='p-4 bg-red-600  shadow-lg shadow-red-500/50 !h-[25px] mb-18'></p>
               <div
                  className='grid grid-cols-12 gap-3'>
                  {
                     boxOfficeList?.danhSachGhe?.map((ghe) => (
                        <Chair
                           key={ghe.maGhe}
                        >
                           <p className={cn('Chair border border-dark rounded d-flex mt-3', {
                              booking: booking?.includes(ghe.tenGhe),
                              booked: ghe.daDat
                           })}
                              onClick={() => {
                                 if (booking?.includes(ghe.tenGhe)) {
                                    setInfoBooking(prev => prev.filter(
                                       (e) => e.name !== ghe.tenGhe
                                    ))

                                    setBooking((prevState) =>
                                       prevState.filter(
                                          (e) => e !== ghe.tenGhe
                                       )
                                    );
                                    return;
                                 }
                                 setBooking([...booking, ghe.tenGhe]);
                                 setInfoBooking([...infoBooking, { name: ghe.tenGhe, price: ghe.giaVe },]);
                                 setTotalPrice([...totalPrice, ghe.giaVe])
                              }}
                           >
                              {ghe.tenGhe}
                           </p>
                        </Chair>
                     ))
                  }
               </div>
            </div>
            <div className='!ml-18'>
               <h2 className='text-center'>Số vé bạn đang chọn</h2>

                  <Table border={1} className='!table-auto border-collapse border border-slate-400 text-center'>
                     {
                        infoBooking.length ? (<thead>
                           <tr className='border p-4 '>
                              <th>Số ghế</th>
                              <th>Giá</th>
                           </tr>
                        </thead>) : ''
                     }
                     <tbody>
                        {
                           infoBooking?.map((item, index) => (

                              <tr key={index}
                                 className='border p-4 '
                              >
                                 <td>{item.name}</td>
                                 <td>{item.price}</td>

                              </tr>
                           ))
                        }
                        {
                           calculateTotalPrice() ? (
                              <tr className='border p-4 '>
                                 <td>Tổng tiền cần thanh toán</td>
                                 <td>
                                    {calculateTotalPrice()}
                                    {/* 0 là giá trị mặc định của total, chair là item */}
                                 </td>
                              </tr>


                           ) : ''
                        }

                     </tbody>
                  </Table>
               {
                  infoBooking.length ? (
                     <Button className='!font-600 !h-[50px] !mt-20 '
                        type='primary'
                        onClick={() => { 
                           const listBooking = boxOfficeList?.danhSachGhe?.filter(e => booking.includes(e.tenGhe)) 
                           console.log("listBooking: ", listBooking);
                           dispatch(datVeThunk({
                              maLichChieu: boxOfficeList?.thongTinPhim?.maLichChieu,
                              danhSachVe: listBooking,
                           })).unwrap() // Giả sử action return một promise, unwrap sẽ giúp nhận kết quả của promise đó
                           .then(() => {
                              toast.success("Đặt vé thành công")
                              sleep(2000)
                              navigate('/')
                           })
                           .catch((error) => {
                              toast.error(error)
                           });
                        }}
                     >Thanh toán</Button>) : ''
               }
            </div>
         </div>

      </div >
      <Footer></Footer>
   </>
   )
}
const Table = styled.table`
   
   tr{
      border: 1px solid #e5e7eb;
      padding:10px 20px;
      td{
         border: 1px solid #e5e7eb;
         padding:10px 20px;
      }
      th{
         border: 1px solid #e5e7eb;
         padding: 10px 20px;
      }
   }
   
`
const Chair = styled.div`
    .Chair {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 6px;

    &:hover {
        cursor: pointer;
        background-color: black;
        color: white;
        transition: all 0.3s ease-in-out;
    }
    &.booking{
        background-color: red;
        border: transparent;
        color: white;
    }
    &.booked{
        background-color: gray;
        border: transparent;
        color: white;
        pointer-events: none;// chặn event click vào nút
    }
    &.disabled{
        border: transparent !important;
        pointer-events: none;

         // chặn event click vào nút
    }
}
`