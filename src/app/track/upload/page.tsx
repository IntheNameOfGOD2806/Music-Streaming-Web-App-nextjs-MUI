
import UploadTab from "@/components/Upload/Upload.Tab";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";


const uploadPage = () => {
  return (
    <>
      <Container>
        <UploadTab />
        <ToastContainer />
      </Container>
    </>
  );
};
export default uploadPage;
