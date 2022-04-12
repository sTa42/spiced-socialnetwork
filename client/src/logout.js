export default function Logout() {
    function logout() {
        fetch("/user/logout.json", { method: "POST" })
            .then((resp) => resp.json())
            .then((data) => {
                location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <button onClick={logout} className="buttonlink navlink">
            LOGOUT
        </button>
    );
}
