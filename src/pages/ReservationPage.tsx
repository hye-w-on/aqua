import { Backdrop, CircularProgress } from '@mui/material';
import { ReservationRequest, ReservationResponse } from '../models/Reservation';
import { useReservations, useUpdateReservation } from '../react-query/hooks/reservationHook';

/* ReactQuery staleTime & cacheTime 예제 (reservationHook.ts에서 설정) */

const ReservationPage = () => {
  const { reservations, isFetching } = useReservations();
  const updateReservation = useUpdateReservation();

  const handleUpdateReservation = (reservation: ReservationResponse) => {
    // 예약가능/예약 중을 toggle , TODO : 개선 필요
    const requset: ReservationRequest = {
      ...reservation,
      status: reservation.status === 'AVAILABLE' ? 'RESERVED' : 'AVAILABLE',
    };
    updateReservation(requset);
  };

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isFetching}>
        <CircularProgress color="inherit" /> Fetching...
      </Backdrop>
      {reservations &&
        reservations.map((reservation: ReservationResponse) => {
          return (
            <div key={reservation.reservationNo}>
              <span>
                {reservation.serviceDate} {reservation.status}{' '}
              </span>
              <button onClick={() => handleUpdateReservation(reservation)}>Update</button>
            </div>
          );
        })}
    </>
  );
};
export default ReservationPage;
