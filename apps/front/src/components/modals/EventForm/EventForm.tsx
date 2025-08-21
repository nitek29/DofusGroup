import "./EventForm.scss";

import { Event } from "../../../types/event";
import { Tag } from "../../../types/tag";
import { Server } from "../../../types/server";
import { Character } from  "../../../types/character";

interface EventFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  tags?: Tag[];
  servers?: Server[];
  characters?: Character[];
  eventToEdit?: Event;
  isEditing?: boolean;
}

export default function EventForm({
  handleSubmit,
  error,
  tags = [],
  servers = [],
  characters = [],
  eventToEdit,
  isEditing = false,
}: EventFormProps) {  
  // Fonction pour formater la date pour l'input datetime-local
  const formatDateForInput = (date: Date | string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="event_modal">
      <h3 className="event_modal_title">
        {isEditing ? "Modifier l'événement" : "Créer un événement"}
      </h3>
      <form onSubmit={handleSubmit} className="event_modal_form">
        <label htmlFor="title" className="event_modal_form_label">
          <span>Titre:</span>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="Titre de l'événement"
            defaultValue={eventToEdit?.title || ""}
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
              defaultValue={eventToEdit?.date ? formatDateForInput(eventToEdit.date) : ""}
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
              defaultValue={eventToEdit?.duration || ""}
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
              defaultValue={eventToEdit?.max_players || ""}
              className="event_modal_form_label_input"
            />
          </label>

          <label htmlFor="tag_id" className="event_modal_form_label">
            <span>Tag:</span>
            <select
              name="tag_id"
              id="tag_id"
              required
              defaultValue={eventToEdit?.tag?.name || ""}
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
          <label htmlFor="status" className="event_modal_form_label">
            <span>Status:</span>
            <select
              name="status"
              id="status"
              required
              defaultValue={eventToEdit?.status || ""}
              className="event_modal_form_label_input"
            >
              <option value="">Sélectionner un status</option>
              <option key="public" value="public">
                Public
              </option>
              <option key="private" value="private">
                Privé
              </option>
            </select>
          </label>
          
          <label htmlFor="character_id" className="event_modal_form_label">
            <span>Personnage:</span>
            <select
              name="character_id"
              id="character_id"
              required
              defaultValue={eventToEdit?.characters?.[0]?.name || ""}
              className="event_modal_form_label_input"
            >
              <option value="">Sélectionner un personnage</option>
              {characters.map((character) => (
                <option key={character.id} value={character.id}>
                  {character.name}
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
              defaultValue={eventToEdit?.area || ""}
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
              defaultValue={eventToEdit?.sub_area || ""}
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
              defaultValue={eventToEdit?.donjon_name || ""}
              className="event_modal_form_label_input"
            />
          </label>

          <label htmlFor="server_id" className="event_modal_form_label">
            <span>Serveur:</span>
            <select
              name="server_id"
              id="server_id"
              required
              defaultValue={eventToEdit?.server?.name || ""}
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
            defaultValue={eventToEdit?.description || ""}
            className="event_modal_form_label_input"
          />
        </label>

        <button
          type="submit"
          aria-label={isEditing ? "Modifier l'événement" : "Créer l'événement"}
          className="event_modal_form_button button"
        >
          {isEditing ? "Modifier l'événement" : "Créer l'événement"}
        </button>
      </form>

      {error && <p className="event_modal_error">{error}</p>}
    </div>
  );
}
