'use client'
import { ITrackTopCustom } from "@/types/backend";
import React, { useState } from "react";

export interface ITrackContext {
  track: ITrackTopCustom;
  setTrack: React.Dispatch<React.SetStateAction<ITrackTopCustom>>;
}
export const initValue = {
  _id: "",
  title: "",
  description: "",
  category: "",
  imgUrl: "",
  trackUrl: "",
  countLike: 0,
  countPlay: 0,
  uploader: {
    _id: "",
    email: "",
    name: "",
    role: "",
    type: "",
  },
  isDeleted: false,
  createdAt: "",
  updatedAt: "",
  isPlaying: false,
};

 const DEFAULT_TRACK: ITrackContext = {
  track: initValue,
  setTrack: () => {},
};

const TrackContext = React.createContext<ITrackContext>(DEFAULT_TRACK);

export const TrackContextProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [track, setTrack] = useState<ITrackTopCustom>(initValue);

  const values: ITrackContext = React.useMemo(
    () => ({
      track,
      setTrack,
    }),
    [track, setTrack]
  );

  return (
    <TrackContext.Provider value={values}>{children}</TrackContext.Provider>
  );
};

export default TrackContext;
