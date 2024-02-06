import CalBody from "./Calendar/CalBody";
import FormHeader from "./form/FormHeader";
import UserForm from "./form/UserForm";

function AppLayout() {
  return (
    <div className=" absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex gap-5 justify-between p-5 bg-slate-200 rounded-md  flex-col sm:flex-row ">
      <CalBody />
      <div className=" relative flex flex-col justify-center items-center  sm:h-auto">
        <FormHeader />
        <UserForm />
      </div>
    </div>
  );
}

export default AppLayout;
