"use client";
import LoginButton from "@/components/auth/LoginButton";
import { Container } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import "./auth-form.scss";

function CustomizedSnackbars(props: any) {
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    console.log(reason);
    if (reason === "clickaway") {
      return;
    }
    //set message null to unmount the snackbar
    props.setMsg("");
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {props.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default function AuthForm({ providers }: any) {
  console.log(providers);
  const [showPassword, setShowPassword] = useState(false);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [willValidate, setWillValidate] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState<boolean>(true);
  //   const usernameRef = useRef<any>(null);
  //   const passwordRef = useRef<any>(null);
  const router = useRouter();
  const handleSignIn = async (e: React.SyntheticEvent) => {
    console.log("check123");
    setIsLoading(true);
    setWillValidate(true);
    e.preventDefault();

    await signIn("credentials", {
      username: Username,
      password: Password,
      redirect: false,
    })
      .then((res) => {
        if (!res?.error) {
          router.push("/");
        } else if (res?.error) {
          setMsg(res?.error as string);
        }
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div>
      <div className="auth-form-wrapper">
        {/* <Container> */}
        <div className="auth-form-container">
          <div className="auth-form-header">
            <div className="header-logo">
              {" "}
              <FaUnlockKeyhole className="header-logo-icon" />
            </div>

            <h2>Sign in</h2>
          </div>
          <Container style={{ marginTop: "40px" }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 0, width: "100%" },
                display: "flex",
                flexDirection: "column",
                gap: "25px",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                error={Username === "" && willValidate ? true : false}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSignIn(e);
                  }
                }}
              />

              <div className="password-input" style={{ position: "relative" }}>
                {" "}
                <TextField
                  error={Password === "" && willValidate ? true : false}
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  type={showPassword ? "text" : "password"}
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignIn(e);
                    }
                  }}
                />
                {showPassword ? (
                  <FaEye
                    onClick={() => setShowPassword(!showPassword)}
                    className="eye-icon"
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "20px",
                      fontSize: "20px",
                    }}
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    className="eye-icon"
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "20px",
                      fontSize: "20px",
                    }}
                  />
                )}
              </div>
              <div
                onClick={(e) => {
                  handleSignIn(e);
                }}
              >
                <LoginButton loading={isLoading} />
              </div>
              <div>
                <Container>
                  {msg && <CustomizedSnackbars msg={msg} setMsg={setMsg} />}
                </Container>
              </div>
              <div className="separator">Or Using</div>
              <div className="auth-form-footer">
                <div className="footer-logos">
                  <div style={{ cursor: "pointer" }} className="google-icon">
                    <FcGoogle
                      onClick={(e) => {
                        e.preventDefault();
                        signIn("google");
                      }}
                    />
                  </div>
                  <div style={{ cursor: "pointer" }} className="github-icon">
                    <FaGithub
                      onClick={(e) => {
                        e.preventDefault();
                        // "GITHUB"
                        signIn("github");
                      }}
                    />
                  </div>
                </div>
              </div>
            </Box>
          </Container>
        </div>
      </div>
    </div>
  );
}
