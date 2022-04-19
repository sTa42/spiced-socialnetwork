import useForm from "../hooks/handle-form";
import useHandleSubmit from "../hooks/handle-submit";

export default function Login() {
    const [values, handleChange] = useForm();
    const [error, handleSubmit] = useHandleSubmit("/user/login", values);

    return (
        <section>
            {error}
            <form onSubmit={handleSubmit}>
                <input name={"email"} onChange={handleChange} type={"email"} />
                <input
                    name={"password"}
                    onChange={handleChange}
                    type={"password"}
                />
            </form>
        </section>
    );
}
