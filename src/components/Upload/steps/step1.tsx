"use client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { default as axios } from "axios";
import { useSession } from "next-auth/react";
import * as React from "react";
import { useMemo } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
//
export function UploadBtn() {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
    </Button>
  );
}
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function StyledDropzone(props: any) {
  const { data: session } = useSession();

  const onDrop = React.useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      //do something with the files
      if (acceptedFiles && acceptedFiles[0]) {
        props.setNextStep(false);
        props.setValue(1);
        const audio = acceptedFiles[0];
        const formData = new FormData();
        formData.append("fileUpload", audio);

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/files/upload`,
            formData,
            {
              headers: {
                target_type: "tracks",
                Authorization: "Bearer " + session?.access_token, //the token is a variable which holds the token
                delay: 2000,
              },
              onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;

                let percent = Math.floor((loaded * 100) / total!);
                // console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                if (percent < 100) {
                  props.setTrackUploadInfo({
                    ...props.trackUploadInfo,
                    trackName: acceptedFiles[0].name,
                    percentage: percent,
                  });
                } else if (percent === 100) {
                  props.setTrackUploadInfo({
                    trackName: acceptedFiles[0].name,
                    percentage: 100,
                  });
                }
              },
            }
          );
          if (res.data) {
            // console.log(res.data);
            props.setTrackUploadInfo({
              ...props.trackUploadInfo,
              trackName: acceptedFiles[0].name,
              percentage: 100,
              uploadedTrackName: res.data.data.fileName,
            });
            toast.success(res.data.data.fileName);
          }
        } catch (error) {
          //@ts-ignore
          alert(error?.response?.data?.message);
        }
      }
    },
    [session]
  );
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: { audio: [".mp3"] }, onDrop });
  const files = acceptedFiles.map((file: FileWithPath) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="container">
      <div
        {
          // @ts-ignore
          ...getRootProps({ style })
        }
      >
        {/* mui upload btn */}
        <UploadBtn />
        {/*  */}
        <input {...getInputProps()} />

        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {/* <button onClick={() => props.setValue(1)}>dadaad</button> */}
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}
export default function Step1(props: any) {
  return (
    <div>
      <p>Step 1</p>
      <StyledDropzone
        setNextStep={props.setNextStep}
        setValue={props.setValue}
        setTrackUploadInfo={props.setTrackUploadInfo}
        trackUploadInfo={props.trackUploadInfo}
      />
    </div>
  );
}
