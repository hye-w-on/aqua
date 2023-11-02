import { UseMutateFunction, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { getMyReservationsApi, getReservationsApi, updateReservationApi } from '../../rest-api/reservationApi';
import { ReservationRequest, ReservationResponse } from '../../models/Reservation';
import { RestApiResponse } from '../../utils/RestApiUtil';
import { useAlertStore } from '../../store/AlertStore';

export const fetchReservations = async () => {
  //console.log('Call axios fetchReservations');
  const response = await getReservationsApi();
  return response.data;
};
export const fetchMyReservations = async (memeberId: string) => {
  const response = await getMyReservationsApi(memeberId);
  return response.data;
};

const initialData: ReservationResponse[] = [
  {
    reservationNo: '1',
    serviceDate: '0000',
    status: 'initialData',
    holder: '',
  },
];

const placeholderData: ReservationResponse[] = [
  {
    reservationNo: '1',
    serviceDate: '0000',
    status: 'placeholderData',
    holder: '',
  },
];

const fallback: ReservationResponse[] = [
  {
    reservationNo: '1',
    serviceDate: '0000',
    status: 'fallback',
    holder: '',
  },
];

export const useReservations = () => {
  const { data: reservations, isFetching } = useQuery([queryKeys.reservations], fetchReservations, {
    //staleTime: 1000 * 50,
    //cacheTime: 1000 * 10,
    //refetchOnMount: false,
    //refetchOnReconnect: true,
    //refetchOnWindowFocus: true,
    //refetchInterval: 1000, // 1초마다 refetch
    //initialData: initialData,
    //placeholderData: placeholderData,
  });

  return { reservations, isFetching };
};

//TODO :
export const useMyReservations = () => {
  const fallback: ReservationResponse[] = [];
  const memeber = { memeberId: '1' };
  const { data: reservations = fallback, isFetching } = useQuery(
    [queryKeys.reservations, queryKeys.member, memeber.memeberId], //invalidateQueries([queryKeys.reservations])시 같이 무효화
    () => fetchMyReservations(memeber.memeberId),
    { enabled: !!memeber }
  );

  return { reservations, isFetching };
};

export const useUpdateReservation = (): UseMutateFunction<
  RestApiResponse<number>,
  unknown,
  ReservationRequest,
  unknown
> => {
  //const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate } = useMutation((reservation: ReservationRequest) => updateReservationApi(reservation), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.reservations]);
      useAlertStore.setState({ type: 'success', message: 'updated', open: true });
    },
  });
  return mutate;
};
