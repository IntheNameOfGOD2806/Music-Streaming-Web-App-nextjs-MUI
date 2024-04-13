import "./Spinner.Loading.scss";
export default function SpinnerPage() {
  // Or a custom loading skeleton component

  return (
    <>
      <section>
        <div className="wrapper">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>
      </section>
    </>
  );
}
