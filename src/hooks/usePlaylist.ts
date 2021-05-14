import { useDispatch, useSelector } from "react-redux";
import { AddPlaylist } from "../actions/playlistActions";
import { RootState } from "../types/interfaces";
/**
 *
 * @returns useAlert - hook.
 *
 * Hook can be used to control the alerts, and get alerts current state.
 */
function usePlaylist(): {
  playlist: RootState["playlist"];
  addPlaylist: typeof addPlaylist;
} {
  const playlist = useSelector((state: RootState) => state.playlist);

  const dispatch = useDispatch();

  const addPlaylist = (id: string) => {
    dispatch(AddPlaylist(id));
  };
  return { playlist, addPlaylist };
}

export default usePlaylist;
