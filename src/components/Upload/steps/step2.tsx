"use client";
import { sendRequest } from "@/utils/api";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { default as axios } from "axios";
import { useSession } from "next-auth/react";
import * as React from "react";
import { toast, ToastContainer } from "react-toastify";
import "./step2.scss";
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
interface category {
  value: string;
  label: string;
}
interface InewTrack {
  title: string;
  description: string;
  trackUrl: string;
  imageUrl: string;
  category: string;
}
interface IpropsSelect {
  category: category[];
  setInfo: (value: string) => void;
  info: InewTrack;
}
function BasicSelect(props: IpropsSelect) {
  // console.log("props", props);
  const { info } = props;
  const [category, setCategory] = React.useState("CHILL");
  // console.log("category", category);
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  React.useEffect(() => {
    info["category"] = category;
    // console.log("info", info);
    // @ts-ignore
    props.setInfo(info);
  }, [category]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={props.category[0].value}>
            {props.category[0].label}
          </MenuItem>
          <MenuItem value={props.category[1].value}>
            {props.category[1].label}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
function LinearWithValueLabel(props: any) {
  // console.log("dfsfsfs", props.percent);
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={props.percent} />
    </Box>
  );
}

const Step2 = (props: any) => {
  const { data: session } = useSession();
  const ref = React.useRef(null);
  const [imagePreview, setImagePreview] = React.useState("");
  const [imagePreviewName, setImagePreviewName] = React.useState("");
  const { setTrackUploadInfo } = props;
  const { trackUploadInfo } = props;
  const [info, setInfo] = React.useState<InewTrack>({
    title: "",
    description: "",
    trackUrl: "",
    imageUrl: "",
    category: "",
  });
  const handleUploadImage = async (image: any) => {
    const formData = new FormData();
    formData.append("fileUpload", image);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/files/upload`,
        formData,
        {
          headers: {
            target_type: "images",
            Authorization: "Bearer " + session?.access_token, //the token is a variable which holds the token
          },
        }
      );
      if (res.data) {
        setInfo({ ...info, imageUrl: res?.data?.data?.fileName });
      }
    } catch (error) {
      //@ts-ignore
      alert(error?.response?.data?.message);
    }
  };
  const handleUploadTrack = async () => {
    try {
      const res1 = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks`,
        method: "POST",
        body: {
          title: info?.title,
          description: info?.description,
          trackUrl: info?.trackUrl,
          category: info?.category,
          imgUrl: info?.imageUrl,
        },
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      if(res1.data)
      {
        toast.success("Upload Track success");
      }
      else if(!res1.data){
        // @ts-ignore
        // alert(res1?.message);
        toast.error(`${res1?.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      //@ts-ignore
      alert(error);
    }
  };
  const handleChangeImage = async (event: any) => {
    const file = event.target.files[0];
    let res;
    if (file) res = await handleUploadImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setImagePreviewName(file.name);
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    if (trackUploadInfo && trackUploadInfo?.uploadedTrackName) {
      //@ts-ignore
      setInfo({ ...info, trackUrl: trackUploadInfo?.uploadedTrackName });
    }
  }, [trackUploadInfo]);
  // console.log("info step 2", info);
  const category = [
    {
      value: "CHILL",
      label: "CHILL",
    },
    {
      value: "WORKOUT",
      label: "WORKOUT",
    },
  ];
  return (
    <>
      <h4>{props?.trackUploadInfo?.trackName}</h4>
      <LinearWithValueLabel percent={props?.trackUploadInfo?.percentage} />
      <Container>
        <section className="upload-infor">
          <div className="image-uploader">
            <figure className="image-box">
            {imagePreview &&

              <img src={imagePreview} alt="preview" />
            }
            </figure>
            <div style={{ width: "80%", overflow: "clip", fontSize: "12px" }}>
              {imagePreviewName}
            </div>

            <label htmlFor="image-inp">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                <input
                  ref={ref}
                  type="file"
                  accept="image/*"
                  id="image-inp"
                  hidden
                  onChange={(e) => {
                    handleChangeImage(e);
                  }}
                />
                Upload file
              </Button>
            </label>
          </div>
          <div className="info-uploader">
            <div className="info-upload-container">
              <TextField
                id="standard-basic"
                label="Title"
                variant="standard"
                value={info?.title}
                onChange={(e) => setInfo({ ...info, title: e.target.value })}
              />
              <TextField
                sx={{ marginBlockEnd: "12px" }}
                id="standard-basic"
                label="Description"
                variant="standard"
                value={info?.description}
                onChange={(e) =>
                  setInfo({ ...info, description: e.target.value })
                }
              />
              {/* @ts-ignore */}
              <BasicSelect category={category} setInfo={setInfo} info={info} />
              <Button
                sx={{ width: "40px", marginBlockStart: "22px" }}
                variant="outlined"
                onClick={handleUploadTrack}
              >
                SAVE
              </Button>
            </div>
          </div>
        </section>
        <ToastContainer />
      </Container>
    </>
  );
};
export default Step2;
