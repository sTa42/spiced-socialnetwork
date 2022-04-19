import useForm from "../hooks/handle-form";
import useHandleSubmit from "../hooks/handle-submit";

export default function Register() {
    const [values, handleChange] = useForm();
    const [error, handleSubmit] = useHandleSubmit("/user/register", values);

    return (
        <section>
            {error}
            <form onSubmit={handleSubmit}>
                <input name={"firstName"} onChange={handleChange} />
                <input name={"lastName"} onChange={handleChange} />
                <input name={"email"} onChange={handleChange} type={"email"} />
                <input
                    name={"password"}
                    onChange={handleChange}
                    type={"password"}
                />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </section>
    );
}
