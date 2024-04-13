'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreatePlaylistDialog from '@/components/PlaylistPage/Dialog';
import AddTrackDialog from './AddTrack.Dialog';
export default function PlaylistSection({
  playlists,
}: {
  playlists: PlayListData;
}){
    const[open, setOpen] = React.useState<boolean>(false);
    const[openAddTrackModal, setOpenAddTrackModal] = React.useState<boolean>(false);
    return(
        <div className="playlist-section-outline">
        <div className="playlist-section">
          <div className="playlist-section-title">Playlist</div>
          <div className="playlist-section-sideButton">
            <Button onClick={() => setOpen(true)} variant="outlined" startIcon={<AddIcon />}>
              PLAYLIST
            </Button>
            {/* create playlist modal */}
            <CreatePlaylistDialog  open={open} setOpen={setOpen} />
            <Button onClick={() => setOpenAddTrackModal(true)} variant="outlined" startIcon={<AddIcon />}>
              TRACK
            </Button>
            <AddTrackDialog playlists={playlists}  open={openAddTrackModal} setOpen={setOpenAddTrackModal} />
          </div>
        </div>
      </div>
    )
}