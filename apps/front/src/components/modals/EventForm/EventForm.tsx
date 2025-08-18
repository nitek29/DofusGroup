import "./EventForm.scss";

import { Event } from "../../../types/event";
import { Tag } from "../../../types/tag";
import { Server } from "../../../types/server";

interface EventFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  tags?: Tag[];
  servers?: Server[];
}

export default function EventForm({
  handleSubmit,
  error,
  tags = [],
  servers = []
}: EventFormProps) {
  return (
    <div className="event_modal">
      <h3 className="event_modal_title">Créer un événement</h3>
      <form onSubmit={handleSubmit} className="event_modal_form">
        <label htmlFor="title" className="event_modal_form_label">
          <span>Titre:</span>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="Titre de l'événement"
            className="event_modal_form_label_input"
          />
        </label>

        <div className="form-row">
          <label htmlFor="date" className="event_modal_form_label">
            <span>Date:</span>
            <input
              type="datetime-local"
              name="date"
              id="date"
              required
              className="event_modal_form_label_input"
            />
          </label>

          <label htmlFor="duration" className="event_modal_form_label">
            <span>Durée (en minutes):</span>
            <input
              type="number"
              name="duration"
              id="duration"
              required
              min="15"
              max="480"
              placeholder="120"
              className="event_modal_form_label_input"
            />
          </label>
        </div>

        <div className="form-row">
          <label htmlFor="max_players" className="event_modal_form_label">
            <span>Nombre de joueurs max:</span>
            <input
              type="number"
              name="max_players"
              id="max_players"
              required
              min="1"
              max="20"
              placeholder="8"
              className="event_modal_form_label_input"
            />
          </label>

          <label htmlFor="tag_id" className="event_modal_form_label">
            <span>Tag:</span>
            <select
              name="tag_id"
              id="tag_id"
              required
              className="event_modal_form_label_input"
            >
              <option value="">Sélectionner un tag</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label htmlFor="area" className="event_modal_form_label">
            <span>Zone:</span>
            <input
              type="text"
              name="area"
              id="area"
              required
              placeholder="Astrub"
              className="event_modal_form_label_input"
            />
          </label>

          <label htmlFor="sub_area" className="event_modal_form_label">
            <span>Sous-zone:</span>
            <input
              type="text"
              name="sub_area"
              id="sub_area"
              required
              placeholder="Forêt d'Astrub"
              className="event_modal_form_label_input"
            />
          </label>
        </div>

        <div className="form-row">
          <label htmlFor="donjon_name" className="event_modal_form_label">
            <span>Nom du donjon (optionnel):</span>
            <input
              type="text"
              name="donjon_name"
              id="donjon_name"
              placeholder="Donjon des Rats du Château d'Amakna"
              className="event_modal_form_label_input"
            />
          </label>

          <label htmlFor="server_id" className="event_modal_form_label">
            <span>Serveur:</span>
            <select
              name="server_id"
              id="server_id"
              required
              className="event_modal_form_label_input"
            >
              <option value="">Sélectionner un serveur</option>
              {servers.map((server) => (
                <option key={server.id} value={server.id}>
                  {server.name} {server.mono_account ? "(Mono-compte)" : ""}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label htmlFor="description" className="event_modal_form_label">
          <span>Description (optionnel):</span>
          <textarea
            name="description"
            id="description"
            placeholder="Description de l'événement..."
            rows={4}
            className="event_modal_form_label_input"
          />
        </label>

        <button
          type="submit"
          aria-label="Créer l'événement"
          className="event_modal_form_button button"
        >
          Créer l'événement
        </button>
      </form>

      {error && <p className="event_modal_error">{error}</p>}
    </div>
  );
}
