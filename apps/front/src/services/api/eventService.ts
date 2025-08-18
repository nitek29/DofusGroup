import { ApiClient } from "../client";

import { PaginatedEvents, Event } from "../../types/event";

export class EventService {
  private axios;

  constructor(axios: ApiClient) {
    this.axios = axios.instance;
  }

  public async getEvents(
    limit?: number,
    page?: number,
  ): Promise<PaginatedEvents> {
    const response = await this.axios.get<PaginatedEvents>("/events", {
      params: { limit, page },
    });
    return response.data;
  }

  public async createEvent(eventData: Partial<Event>): Promise<Event> {
    // Approche sécurisée : le backend lit l'userId depuis le JWT
    // Pas besoin de passer l'userId dans l'URL
    const response = await this.axios.post<Event>("/events", eventData);
    return response.data;
  }
}
