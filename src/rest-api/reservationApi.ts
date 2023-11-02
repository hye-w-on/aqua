import { ReservationRequest, ReservationResponse } from '../models/Reservation';
import { Method, RestApiResponse, Service, callRestApi } from '../utils/RestApiUtil';

export const getReservationsApi = async (): Promise<RestApiResponse<ReservationResponse[]>> => {
  return callRestApi({
    service: Service.AQUA_BE,
    method: Method.GET,
    url: `/v1/reservations`,
  });
};

export const getMyReservationsApi = async (memeberId: string): Promise<RestApiResponse<ReservationResponse[]>> => {
  return callRestApi({
    service: Service.AQUA_BE,
    method: Method.GET,
    url: `/v1/reservations`,
    body: { memeberId: memeberId },
  });
};

export const updateReservationApi = async (reservation: ReservationRequest): Promise<RestApiResponse<number>> => {
  const response = await callRestApi({
    service: Service.AQUA_BE,
    method: Method.PUT,
    url: `/v1/reservation`,
    body: reservation,
  });
  return response;
};
